import os
import subprocess

try:
    import MetaTrader5 as mt5
except ImportError:
    mt5 = None


_MT5_PROCESS_NAMES = (
    "terminal64.exe",
    "terminal.exe",
)


def is_mt5_terminal_running() -> bool:
    if os.name != "nt":
        return False

    try:
        completed_process = subprocess.run(
            [
                "tasklist",
                "/FO",
                "CSV",
                "/NH",
            ],
            capture_output=True,
            text=True,
            check=False,
            timeout=5,
        )
    except (
        OSError,
        subprocess.SubprocessError,
    ):
        return False

    running_processes = completed_process.stdout.lower()

    return any(
        f'"{process_name}"' in running_processes
        for process_name in _MT5_PROCESS_NAMES
    )


def initialize_mt5_if_running() -> tuple[bool, str | None]:
    if mt5 is None:
        return (
            False,
            "MetaTrader5 Python package is not installed.",
        )

    if not is_mt5_terminal_running():
        return (
            False,
            (
                "MT5 terminal is not running. "
                "Open MetaTrader 5 and log in before using live data or sync."
            ),
        )

    if not mt5.initialize():
        return (
            False,
            f"MT5 terminal connection failed: {mt5.last_error()}",
        )

    return True, None
