const isPregnant = true;

const promise = new Promise((resolve,reject)=>{
    if(isPregnant)
    {resolve('Good')

    }else{
        reject('Not Good')
    }
});
promise
.then(name=>{
    console.log(`This is ${name}`);
})
.catch(name=>{
    console.log(`This is ${name}`);
})
.finally(()=>{
    console.log(`It is All right`);
})