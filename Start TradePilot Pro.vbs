Option Explicit

Dim shell
Dim fileSystem
Dim scriptFolder
Dim powershellScript
Dim command

Set shell = CreateObject("WScript.Shell")
Set fileSystem = CreateObject("Scripting.FileSystemObject")

scriptFolder = fileSystem.GetParentFolderName(WScript.ScriptFullName)
powershellScript = fileSystem.BuildPath(scriptFolder, "start_tradepilot.ps1")

If Not fileSystem.FileExists(powershellScript) Then
    MsgBox "Δεν βρέθηκε το αρχείο:" & vbCrLf & powershellScript, vbCritical, "TradePilot Pro"
    WScript.Quit 1
End If

command = "powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File """ & powershellScript & """"

shell.Run command, 0, False