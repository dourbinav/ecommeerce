      import React, { useEffect, useRef, useState } from "react";
      import axios from "axios";
      import Card from "./Card";
      import Navbar from "./Navbar"
      import { useNavigate } from "react-router-dom";

      export default function Dashboard() {

        const navigate=useNavigate()
         const user=localStorage.getItem("user")
       
        // useEffect(()=>{
          if(!user || user == undefined){
            navigate('/login')
          }
        // },[user])
        // const usertoken=localStorage.getItem("user-token")
        // 
        //   if(!usertoken){
        //     navigate('/signup')
        //   }
        const refElement= useRef()
        const [query, setquery] = useState(16);

        function products() {
          return axios.get(
            "https://dummyjson.com/products?limit=16&skip=0&`"
          );
        }
        // async function Backpage(){
        //     const A =await a().then((response) => response.data.products);
        //     function a() {
        //       return axios.get(
        //         `https://dummyjson.com/products?limit=16&skip=${query}&select=title,price,description,thumbnail`
        //       );
        //     }
        //     console.log("update product");
        //     setquery(query - 16);
        //     setproduct(A);
          
        // }

       async function Nextpage() {
          const A =await a().then((response) => response.data);
          function a() {
            return axios.get(
              `https://dummyjson.com/products?limit=16&skip=${query}&select=title,price,description,thumbnail`
            );
          }
          if(query > 90)
          { 
            refElement.current.disabled="true"
            refElement.current.style.backgroundColor="blue"
          }
          setquery(query + 16);
          setproduct(A);
        }

        const [product, setproduct] = useState([]);

        useEffect(() => {
          const p = products();
          p.then((response) => {
            setproduct(response.data.products)
            .catch(err => {
               console.log(err)
            })
          });
        }, []);
        // console.log(product);

        return (
          <>
          <Navbar />
          <div className="sm:m-6">
            <div className="flex grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-2 p-4">
              {product.map((p) => (
                <Card key={p.title} id={p.id} title ={p.title} price={p.price} image={p.thumbnail} description={p.description}/>
              )) }
            </div>
            <div className="flex justify-between">
              <button className="bg-black text-white p-1 rounded-md "
              >
                &larr; Back
              </button>
              <button
                onClick={Nextpage}
                id="nextbutton"
                className="bg-black text-white p-1 rounded-md"
              >
                &rarr; Next
              </button>
            </div>
          </div>
          </>
        );
      }
