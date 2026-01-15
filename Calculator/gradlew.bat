@echo off
rem -----------------------------------------------------------------------------
rem Gradle startup script for Windows
rem -----------------------------------------------------------------------------
setlocal

set DIR=%~dp0
set WRAPPER_JAR=%DIR%gradle\wrapper\gradle-wrapper.jar

if exist "%WRAPPER_JAR%" (
  java -jar "%WRAPPER_JAR%" %*
) else (
  echo Gradle wrapper jar not found. Run 'gradle wrapper' to generate it.
  exit /b 1
)
