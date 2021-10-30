#![allow(dead_code)]

use std::collections::HashMap;

use serde::{Serialize,Deserialize};

use tokio::net::{TcpListener,TcpStream,unix::SocketAddr};
use tokio::io::{AsyncBufReadExt,AsyncReadExt,AsyncWriteExt,BufReader}; 

use mongodb::{Database};
use mongodb::{Client, options::ClientOptions};
use mongodb::bson::{doc, Document};

use chrono::prelude::*;


#[derive(Serialize, Deserialize)]
struct bus_position{
    x:f64,
    y:f64,
    busId:i32,
}
fn from_json(line:&str)->bus_position{
    serde_json::from_str(line).unwrap()  
}
async fn get_mongo_connection() -> Result<Database,mongodb::error::Error>{
    let mut client_options = ClientOptions::parse("mongodb+srv://temp:hEgyJQPdSa3OMMDD@bustracker.awm8x.mongodb.net/test").await?;
    let client = Client::with_options(client_options)?;
    let db = client.database("test");
    Ok(db)
}

async fn update(u:bus_position){
    let db=get_mongo_connection().await.unwrap();
    let utc: DateTime<Utc> = Utc::now();

    let coll=db.collection::<Document>("bus");
    let update=doc!{"$set": {"curr_long":u.y,"curr_lat":u.x, "time_since_update":  utc.format("%s").to_string().parse::<i32>().unwrap()}};
    let filter=doc!{"bid":u.busId,"curr_long":{"$ne":u.y},"curr_lat":{"$ne":u.x}};
    coll.find_one_and_update(filter,update,None).await.unwrap();

}
async fn query(u:bus_position){

    let db=get_mongo_connection().await.unwrap();
    let coll=db.collection::<Document>("bus");
    let filter=doc!{"bid":u.busId,"curr_long":{"$ne":u.y},"curr_lat":{"$ne":u.x}};
    println!("{:?}",coll.find_one(filter,None).await.unwrap());

}

#[tokio::main]
async fn main(){
    let LISTENER_ADDR="localhost:8080";
    let listener : TcpListener=TcpListener::bind(LISTENER_ADDR).await.unwrap();
    loop{
        let (mut socket,addr)=listener.accept().await.unwrap();
        println!("new client: {:?}", addr);
        tokio::spawn(async move {
            let (reader,mut writer)=socket.split();
            let mut reader=BufReader::new(reader);
            let mut line=String::new();
            loop{

                let bytes_read=reader.read_line(&mut line).await.unwrap();
                if bytes_read==0{
                    break; // connector exited
                }
                update(from_json(&line)).await; writer.write_all(line.as_bytes()).await.unwrap();
                println!("{}",line);
                line.clear();
            }
        });
    }


}

