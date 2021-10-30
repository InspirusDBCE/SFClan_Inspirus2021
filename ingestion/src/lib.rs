#![allow(dead_code)]
use tokio::net::{TcpListener,TcpStream,unix::SocketAddr};
use tokio::io::AsyncReadExt; 


#[tokio::main]
async fn makeListener(){
let LISTENER_ADDR:String="localhost:8080";
        let listener : TcpListener=TcpListener::bind(LISTENER_ADDR).await.unwrap();
        let mut _addr:std::net::SocketAddr;
        let mut socket:TcpStream;
        match  listener.accept().await{
            Ok((socket,addr)) =>{
            println!("new client: {:?}", addr);
                    let mut buffer=[0u8;1024];
        socket.read(&mut buffer).await.unwrap();

        },
            Err(e) => println!("couldn't get client: {:?}", e),
        }
        
}

fn main(){
    println!("hello");
}

// #[cfg(test)]
// mod tests {
//     #[test]
//     fn it_works() {
//         assert_eq!(2 + 2, 4);
//     }
// }
