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
    phoneno = db.IntField()
    password= db.StringField()
    busIds= db.ListField(db.IntField())
    def to_json(self):
        return {"number": self.phoneno,
                "password": self.password,
                "manager_id": self.id
                }

# BusManager(phoneno=123,password="alsdkjas",busIds=[12]).save()
# BusManager(phoneno=4,password = "alsdkjas",manager_id="123",busIds=[12,13,14,15]).save()

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
            BusMan = BusManager.objects(phoneno = data['phoneno']).first()
        except Exception as e:
            print (e)
            return jsonify({'message':'Token is invalid'})

        return f(*args, **kwargs)
    return decorated

#Login
@app.route('/login',methods=['POST'])
def query_logins():
    phoneno = request.get_json().get("phoneno")
    password = request.get_json().get("password")
    print(request.get_json())
    obj = BusManager.objects(phoneno = phoneno)
    print(password, obj.first().to_json()['password'])
    #print(obj.first.password, password)
    #return obj
    if obj and password == obj.first().password:
        # resp=make_response('set cookie')
        # resp.set_cookie(COOKIE_NAME,obj.id)
        # return jsonify({"cookie":obj.id})
        token = jwt.encode({'phoneno' : phoneno, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=60)}, app.config['SECRET_KEY'])

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
