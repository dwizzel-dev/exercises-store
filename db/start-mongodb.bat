@echo "MongoDB Start"
@echo off
SET MONGODBPATH=C:\Program Files\MongoDB\Server\3.4\bin
SET CONFIGPATH=C:\Users\dwizzel.dev\Desktop\dwizzel.dev\exercises-store\db\config
"%MONGODBPATH%\mongod" --config "%CONFIGPATH%\mongod.cfg"
@echo "MongoDB Stopped"