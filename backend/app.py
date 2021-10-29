from flask import Flask, request, jsonify, make_response
from flask import g, request, abort
from flask_mongoengine import MongoEngine
from flask_mongoengine.wtf import model_form
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
import bcrypt
# import jwt
import json

# MongoDB setup
app = Flask(__name__)
mongodb_password="testtest69#"
database_name = "bustracker"
DB_URI = "mongodb+srv://temp:hEgyJQPdSa3OMMDD@bustracker.awm8x.mongodb.net/test".format(mongodb_password)
app.config["MONGODB_HOST"] = DB_URI
db = MongoEngine()
db.init_app(app)

CANDIDATE=bcrypt.gensalt()
COOKIE_NAME='bus-session'
#Models
class BusManager(db.Document):
    manager_id= db.StringField()
    phone_no = db.IntField()
    password= db.StringField()
    busIds= db.ListField(db.IntField())
    def to_json(self):
        return {"number": self.phone_no,
                "password": self.password,
                "manager_id": self.id
                }

def generate_random_string():
   return '%030x' % random.randrange(16**30)
def password_hash(password):
    return bcrypt.hashpw(password.encode("utf-8"),CANDIDATE)

# BusManager(phone_no=123,password="alsdkjas",busIds=[12]).save()
BusManager(phone_no=838,password=password_hash("alsdkjas"),manager_id="123",busIds=[12,13,14,15]).save()


@app.route('/authenticate',methods=['POST'])
def query_logins():
    phone_no=request.args.get("phone_no")
    password=request.args.get("password")
    obj=BusManager.objects(phone_no=phone_no)
    return obj
    if obj and bcrypt.checkpw(password.encode("utf-8"),obj.first().password.encode("utf-8")):
        resp=make_response('set cookie')
        resp.set_cookie(COOKIE_NAME,obj.id)
        return jsonify({"cookie":obj.id})
    else:
        return abort(401)


@app.route('/verify',methods=['GET'])
def check_cookie():
    cookie=request.cookies.get(COOKIE_NAME)
    print(cookie,"HERE")
    if cookie:
        manager=BusManager.objects(id=cookie)
        return jsonify(manager)
    else:
        return abort(401)

@app.route('/cheat',methods=['GET'])
def cheat_cookie():
    resp=make_response('set cookie')
    resp.set_cookie(COOKIE_NAME,"123")
    return jsonify({"cookie":"123"})

app.run(debug=True)        
