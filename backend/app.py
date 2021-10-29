from flask import Flask
from flask_mongoengine import MongoEngine
from creds import mongodb_password

app = Flask(__name__)

database_name = bowner
DB_URI = "mongodb+srv://dbUser:{}@bustracker.awm8x.mongodb.net/?retryWrites=true&w=majority".format(mongodb_password)
app.config["MONGODB_HOST"] = DB_URI

db = MongoEngine()
db.init_app(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(debug = 'True')