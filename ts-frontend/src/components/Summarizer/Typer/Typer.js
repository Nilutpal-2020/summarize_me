import React from 'react';

const Typer = (props) => {
    const texts = props.summary;
    const speed = 50;
    let count = 0;

    const type_write = async () => {
        console.log(count);
        if (count < texts.length) {
            document.getElementById("type_test").innerHTML += texts.charAt(count);
            count += 1
            await setTimeout(type_write, speed);
        }
    }

    type_write();
    return(
        <div>
            {/* <button onClick={type_write}>Click me</button> */}
            <div id="type_test"></div>
        </div>
    )
}

export default Typer;