import io
from datetime import datetime

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)


def build_trades_pdf_report(trades):

    buffer = io.BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=30,
        leftMargin=30,
        topMargin=30,
        bottomMargin=30
    )

    styles = getSampleStyleSheet()

    story = []

    title = Paragraph(
        "TradePilot Pro",
        styles["Title"]
    )

    subtitle = Paragraph(
        "Professional Trading Report",
        styles["Heading2"]
    )

    generated = Paragraph(
        f"Generated: {datetime.now().strftime('%d/%m/%Y %H:%M')}",
        styles["Normal"]
    )

    story.append(title)
    story.append(subtitle)
    story.append(generated)
    story.append(Spacer(1, 20))

    total_trades = len(trades)

    wins = len([
        trade for trade in trades
        if trade.is_win == 1
    ])

    losses = total_trades - wins

    win_rate = 0

    if total_trades > 0:
        win_rate = round(
            wins / total_trades * 100,
            2
        )

    total_profit = sum([
        trade.profit_money or 0
        for trade in trades
    ])

    total_pips = sum([
        trade.profit_pips or 0
        for trade in trades
    ])

    kpi_data = [
        ["Total Trades", total_trades],
        ["Wins", wins],
        ["Losses", losses],
        ["Win Rate", f"{win_rate}%"],
        ["Net Profit", f"{round(total_profit, 2)}"],
        ["Total Pips", f"{round(total_pips, 2)}"]
    ]

    kpi_table = Table(
        kpi_data,
        colWidths=[180, 180]
    )

    kpi_table.setStyle(
        TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#1E293B")),
            ("TEXTCOLOR", (0, 0), (-1, -1), colors.white),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
            ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
        ])
    )

    story.append(kpi_table)
    story.append(Spacer(1, 25))

    story.append(
        Paragraph(
            "Trades",
            styles["Heading2"]
        )
    )

    data = [[
        "ID",
        "Pair",
        "Dir",
        "Profit",
        "Pips",
        "RR"
    ]]

    for trade in trades:
        data.append([
            trade.id,
            trade.symbol,
            trade.direction,
            trade.profit_money,
            trade.profit_pips,
            trade.risk_reward
        ])

    trades_table = Table(
        data,
        repeatRows=1
    )

    trades_table.setStyle(
        TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0F172A")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("GRID", (0, 0), (-1, -1), 0.4, colors.grey),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [
                colors.whitesmoke,
                colors.lightgrey
            ]),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 8),
        ])
    )

    story.append(trades_table)

    doc.build(story)

    buffer.seek(0)

    return buffer