from flask import Flask,render_template,request,redirect,url_for,flash
from flask_bootstrap import Bootstrap5
from typing import List
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer,String,ForeignKey
from sqlalchemy.orm import DeclarativeBase,Mapped,mapped_column,relationship
# from sqlalchemy.orm.exc import .False.
import time
import os
from flask_login import UserMixin,LoginManager,login_user,login_required,current_user,logout_user

app=Flask(__name__)
Bootstrap5(app)

colors=["#DB7093","#C71585","#FF1493","#7B68EE","#483D8B","#6A5ACD","#4B0082","#800080","#8B008B"
                                                                                        ""]
#db creation
class Base(DeclarativeBase):
    pass

app.config["SQLALCHEMY_DATABASE_URI"]=os.environ.get("DB_TASK","sqlite:///C:/Users/ganes/PycharmProjects/TaskManager/instance/task5.db")
db=SQLAlchemy(model_class=Base)
db.init_app(app)

app.config["SECRET_KEY"]=os.environ.get("EMAIL_KEY")

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return db.get_or_404(User1, user_id)



# Creating Register Table
class User1(UserMixin,db.Model):
    __tablename__= "users"
    id:Mapped[int]=mapped_column(Integer,primary_key=True)
    name:Mapped[str]=mapped_column(String,nullable=False)
    email:Mapped[str]=mapped_column(String,nullable=False)
    password:Mapped[str]=mapped_column(String,nullable=False)
    # tasks:Mapped[List["Tasks1"]]=relationship(back_populates="lists")
    tasks: Mapped[List["Tasks1"]] = relationship(back_populates="list1")

# Creating Task Table
class Tasks1(db.Model):
    __tablename__="tasks"
    id:Mapped[int]=mapped_column(Integer,primary_key=True)
    name:Mapped[str]=mapped_column(String,nullable=False)
    list_id:Mapped[int]=mapped_column(ForeignKey("users.id"))
    list1:Mapped[str]=relationship("User1",back_populates="tasks")



with app.app_context():
    db.create_all()

data=User1(
    name="Ganesh katamreddy",
    email="ganeshreddyk8g@gmail.com",
    password="k.ganesh789",)
#     tasks=[Tasks1(
#         name="ganeshreddy"
#     )]

# )
data1=Tasks1(
          name="non"
         )

#
# with app.app_context():
#     db.session.add(data)
#     db.session.commit()

@app.route("/",methods=["GET","POST"])
def home():
    # data=db.session.execute(db.select(Tasks1).where(Tasks1.id==8))
    # data=data.scalar()
    # db.session.delete(data)
    # db.session.commit()
    if request.method=="POST":
        # task1=Tasks1(
        #     list_id=1,
        #     name=request.form.get("input"),
        # )
        # db.session.add(task1)
        # db.session.commit()
        return redirect(url_for('list1'))
    return render_template("index.html")

@app.route("/register",methods=["GET","POST"])
def register():
    if request.method=="POST":
        print(request.form.get("name"),"name")
        data=User1(
            name=request.form.get("name"),
            email=request.form.get("email"),
            password=request.form.get("password")
        )
        db.session.add(data)
        db.session.commit()
        login_user(data)

        return redirect(url_for("list1"))
    return render_template("register.html")


@app.route("/list",methods=["GET","POST"])
@login_required
def list1():
    print(current_user.id,"current_user")
    data=db.session.execute(db.select(Tasks1).where(Tasks1.list_id==current_user.id))
    data=data.scalars().all()
    print(data,"length of list")
    if request.method=="POST":
        print(request.form.get("checkbox"),"checkbox")
        task1=Tasks1(
            list_id=current_user.id,
            name=request.form.get("input")
        )

        db.session.add(task1)
        db.session.commit()
        data = db.session.execute(db.select(Tasks1).where(Tasks1.id==current_user.id))
        data = data.scalars().all()
        return redirect(url_for('list1'))
    return render_template("lists.html",lists=data,current_user=current_user)

def decor(fun):
    def inner(id):
        return render_template("cross_text.html")
        # sleep(4)
        # return fun(id)
    return inner




# @decor
@app.route("/delete/<int:id>",methods=["GET","POST"])
def delete(id):
    data=db.session.execute(db.select(Tasks1).where(Tasks1.id==id))
    data=data.scalar()
    if data:
        # return render_template("cross_text.html")
        db.session.delete(data)
        db.session.commit()
        return redirect(url_for("list1"))
    else:
        return redirect(url_for("list1"))


@app.route("/login",methods=["GET","POST"])
def login():
    if request.method=="POST":
        email=request.form.get("email")
        data=db.session.execute(db.select(User1).where(User1.email==email))
        data=data.scalar()
        if data:
            login_user(data)
            return redirect(url_for('list1'))
        else:
            flash("Sorry! the email is wrong")
            return redirect(url_for("login"))
    return render_template("login.html")

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))


if __name__=="__main__":
    app.run(debug=False)