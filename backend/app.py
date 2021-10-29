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
from flask_cors import CORS



# MongoDB setup
app = Flask(__name__)
CORS(app)
mongodb_password="testtest69#"
database_name = "bustracker"
DB_URI = "mongodb+srv://temp:hEgyJQPdSa3OMMDD@bustracker.awm8x.mongodb.net/test"
app.config["MONGODB_HOST"] = DB_URI
db = MongoEngine()
db.init_app(app)

bcrypt = Bcrypt(app)   
LATEST_BID=0
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

class Bus(db.Document):
    reg=db.StringField()
    bid=db.IntField()
    sc_lat=db.ListField(db.FloatField())
    sc_long=db.ListField(db.FloatField())
    sc_pid=db.ListField(db.StringField())
    sc_time=db.ListField(db.StringField())
    sc_name=db.ListField(db.StringField())
    curr_lat=db.FloatField()
    curr_long=db.FloatField()
    next_dest=db.StringField()
    time_since_update=db.IntField()

    def to_json(self):
        sched=[]
        for i in range(len(sc_lat)):
            sched.append({
                "lat":self.sc_lat[i],
                "long":self.sc_long[i],
                "pid":self.sc_pid[i],
                "name":self.sc_name[i],
                "time":self.sc_time[i],

                })
        return {
                "reg":self.ref ,
                "sc":sched,
                 "number": self.phoneno,
                "password": self.password,
                "manager_id": self.id
                }


def get_bid():
    global LATEST_BID    
    for bus in Bus.objects():
        print(bus,bus.bid)
        if LATEST_BID<bus.bid:
            LATEST_BID=bus.bid
    return LATEST_BID
get_bid()

def generate_random_string():
   return '%030x' % random.randrange(16**30)
def password_hash(password):
    return bcrypt.hashpw(password.encode("utf-8"),CANDIDATE)

# BusManager(phone=123,password="alsdkjas",busIds=[12]).save()
#  BusManager(phone=1234567890,password = "alsdkjas",manager_id="123",busIds=[12,13,14,15]).save()

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

@app.route('/nearby',methods=['POST'])
def nearby():
    
    return jsonify(Bus.objects()[:5])

@app.route('/authentication',methods=['GET'])
@token_required
def authen():
    return jsonify({"message" : "you're authenticated bitch"})

    

@app.route('/bus',methods=['POST'])
@token_required
def new_bus():
    global LATEST_BID
    token = request.headers['x-access-token']
    phone=jwt.decode(token, app.config['SECRET_KEY'], algorithms = 'HS256',options={"verify_signature": False})['phone']
    current_user=BusManager.objects(phone=phone).first()
    print(current_user) 
    newBusIds=current_user.busIds
    print(newBusIds)
    newBusIds.append(LATEST_BID+1)

    newBusIds=list(set(newBusIds))


    current_user.update(busIds=newBusIds)
    args=request.get_json()
    sched=args["schedule"]
    sc_lat=[]
    sc_long=[]
    sc_pid=[]
    sc_name=[]
    sc_time=[]
    for slot in sched:
        sc_lat.append(slot['lat'])
        sc_long.append(slot['lng'])
        sc_name.append(slot['name'])
        sc_time.append(slot['time'])
        sc_pid.append(slot['place_id'])
    reg=args["reg"]
    Bus(bid=LATEST_BID+1,reg=reg,sc_lat=sc_lat,sc_long=sc_long,sc_pid=sc_pid ,sc_name=sc_name,sc_time=sc_time,curr_long=0.0, curr_lat=0.0,next_dest=sc_pid[0],time_since_update=0).save()
    LATEST_BID+=1
    return make_response("",200)


     

    # return abort(401)

if __name__ == '__main__':
    app.run(debug='True')
