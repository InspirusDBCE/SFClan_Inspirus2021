from flask import Flask, request, jsonify, make_response
from flask import g, request, abort
from flask_mongoengine import MongoEngine
from flask_mongoengine.wtf import model_form
from flask.ext.bcrypt import Bcrypt
#from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
import jwt
import json

# MongoDB setup
app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'your_database',
    'host': 'localhost',
    'port': 27017
}
db = MongoEngine()
db.init_app(app)

#Models
class BusManagerPrototype(db.Document):
    phone_no = db.IntField()
    password= db.StringField()

    def to_json(self):
        return {"number": self.phone_no,
                "password": self.password}

# BusManager=model_form(BusManagerPrototype,field_args={"password":True})

bcrypt = Bcrypt(app)


@app.route('/authenticate', methods=['POST'])
def query_records():
    phone_no = request.args.get('phone')
    password= request.args.get("password")
    user = BusManager.objects(phone_no=phone_no).first()
    if not user:
        return jsonify({'error': 'data not found'})
    else:
        # Passwrod verifaction
        # login_user(user)
        # return jsonify(user.to_json())
        pwhash = bcrypt.generate_password_hash('hunter2')
        resp = make_response('set cookie')
        resp.set_cookie('session', pwhash)
        return resp


@app.route('/', methods=['PUT'])
def create_record():
    record = json.loads(request.data)
    user = User(name=record['name'],
                email=record['email'])
    user.save()
    return jsonify(user.to_json())


@app.route('/', methods=['POST'])
def update_record():
    record = json.loads(request.data)
    user = User.objects(name=record['name']).first()
    if not user:
        return jsonify({'error': 'data not found'})
    else:
        user.update(email=record['email'])
    return jsonify(user.to_json())
