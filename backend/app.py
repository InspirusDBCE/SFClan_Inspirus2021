from logging import debug
from flask import Flask, config, request, jsonify, make_response
import jwt  
import datetime
from flask import g, request, abort
from flask_mongoengine import MongoEngine
from flask_mongoengine.wtf import model_form
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user 
from flask_bcrypt import Bcrypt
from functools import wraps
# import jwt
import json



# MongoDB setup
app = Flask(__name__)
mongodb_password="testtest69#"
database_name = "bustracker"
DB_URI = "mongodb+srv://temp:hEgyJQPdSa3OMMDD@bustracker.awm8x.mongodb.net/test"
app.config["MONGODB_HOST"] = DB_URI
db = MongoEngine()
db.init_app(app)

bcrypt = Bcrypt(app)   

# CANDIDATE  =bcrypt.gensalt()
# COOKIE_NAME='bus-session'




#Models
class BusManager(db.Document):
    manager_id= db.StringField()
    phone = db.IntField()
    password= db.StringField()
    busIds= db.ListField(db.IntField())
    def to_json(self):
        return {"number": self.phone,
                "password": self.password,
                "manager_id": self.id
                }

def generate_random_string():
   return '%030x' % random.randrange(16**30)
def password_hash(password):
    return bcrypt.hashpw(password.encode("utf-8"),CANDIDATE)

# BusManager(phone=123,password="alsdkjas",busIds=[12]).save()
#BusManager(phone=4,password = "alsdkjas",manager_id="123",busIds=[12,13,14,15]).save()

app.config['SECRET_KEY'] = 'phonixlodu'

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers['x-access-token']
        print (token)

        if not token:
            return jsonify({'message' : 'Token is missing'})
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms = 'HS256')
            print(data)
            BusMan = BusManager.objects(phone = data['phone']).first()
        except Exception as e:
            print (e)
            return jsonify({'message':'Token is invalid'})

        return f(*args, **kwargs)
    return decorated

#Login
@app.route('/login',methods=['POST'])
def query_logins():
    phone = request.get_json().get("phone")
    password = request.get_json().get("password")
    print(request.get_json())
    obj = BusManager.objects(phone = phone)
    print(password, obj.first().to_json()['password'])

    if obj and password == obj.first().password:

        token = jwt.encode({'phone' : phone, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=60)}, app.config['SECRET_KEY'])

        return jsonify({'token' : token})
    else:
        return abort(401)

@app.route('/hello', methods = ['GET'])
def okok():
    return 'hello'



@app.route('/authentication',methods=['GET'])
@token_required
def authen():
    return jsonify({"message" : "you're authenticated bitch"})

if __name__ == '__main__':
    app.run(debug='True')
