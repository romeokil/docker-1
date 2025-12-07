This is the pdf through which you can refer docker commands -> https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/publicFiles/Docker%20CheatSheet%20ApnaCollege.pdf


In case you want to work with databases like mongo or sql there is separate docker GUI images for their respective containers (mongo,sql) and you need to do port mapping + you need to make a network and include both of these mongo + mongo-express(GUI mongo) inside and connect each other so that they can interact. 


See the Mongo and mongo-express docker pull command for reference same you need to do for other DB's and in documentatation (dockerhub) mongo-express [--ME_CONFIG_MONGODB_URL--] this line is not given told by shardha di and even till now it is not mention but we need to do that otherwise we won't able to connect it.

for mongo image->
docker run -d ^
More? --name mongo ^
More? -p27017:27017 ^
More? --network mongo-network ^
More? -e MONGO_INITDB_ROOT_USERNAME=admin ^
More? -e MONGO_INITDB_ROOT_PASSWORD=querty ^
More? mongo

for mongo-express image->
docker run -d ^
More? --name mongo-express ^
More? --network mongo-network ^
More? -p8081:8081 ^
More? -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin ^
More? -e ME_CONFIG_MONGODB_ADMINPASSWORD=querty ^
More? -e ME_CONFIG_MONGODB_URL="mongodb://admin:querty@mongo:27017" ^
More? mongo-express

agr tm dhyan se dekho toh 2 chizen hai isme for we need to take care
1. hmlog apne mongo and mongo-express ko same network se connect kiye hue hai 
2. jo root username,password mongo me use kiye whi same hmlog adminsuername, adminuserpassword mongoexpress ke time use kiye

or successfully build hone ke baad mongo express ka gui hmlog localhost:8081 pe khole toh wha bhi one time user name password manga but wo alg hai hmlog abhi usko username-> admin password-> pass diye or jaise hi enter kiye , we are able to see that gui for the mongo-express.



either hmlog terminal se docker container create kr skte hai ya phir dockercompose file create krke (mongodb.yaml) niche likhe hai dusra baat agr hmlog .yaml file likh ke krte hai toh isse fayda ye hota hai ki hmlogo ko alg se network create ni krna pdta hai jo bhi services hm likhege sblog ek hi network ke andr aa jaega ye acha baat hai.

mongodb.yaml -> (file) 

version:"3.8"

services:
  mongo:
    image:mongo
    ports:
    - 27017:27017
    environment:
      MONGO_INITDB_ROOT_USERNAME:admin
      MONGO_INITDB_ROOT_PASSWORD:querty

  mongo-express:
    image:mongo-express
    ports:
    -8081:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME:admin
      ME_CONFIG_MONGODB_ADMINPASSWORD:querty
      ME_CONFIG_MONGODB_URL: mongodb://admin:querty@mongo:27017/
