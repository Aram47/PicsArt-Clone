import React from "react";


export default function Header ()  {
    return (
        <>
            <header className="Header">
                <Img src="https://pastatic.picsart.com/cms-pastatic/8218299e-3dc4-4d50-8a54-0b78d3f5a683.svg" alt={"Picsart"}/>
                <div className="searchbar">
                    <Input type={"text"} placeholder={"Search for anything"}/>
                    <i className="fas fa-search" ></i> 
                    <Button className={"input_filed"} field="Start creating"/>
                </div>
            </header>
        </>
    )
 }


 function Img ({src, alt}: {src: string; alt: string}) {
    return (
        <img src={src} alt={alt} />
    )
 } 


 function Input ({type , placeholder} : {type : string ; placeholder : any}) {
    return (
        <input  type={type} placeholder={placeholder}/>
    )
 }

 function Button ({className , field} : {className : string ; field : string}) {
        return (
            <button className={className}>{field}</button>
        )
 }