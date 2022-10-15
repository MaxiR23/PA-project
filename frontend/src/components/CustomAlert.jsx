import React from 'react';

const CustomAlert = ({ msg, error }) => {

    return (
        <>
            {error ?
                <div style={{
                    padding: '10px',
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'center',
                    backgroundColor:'red'
                }}>
                    <b style={{color:'white'}}> {msg} </b>
                </div>
                :
                <div style={{
                    padding: '10px',
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'center',
                    backgroundColor:'blue'
                }}>
                    <b style={{color:'white'}}> {msg} </b>
                </div>
            }
        </>
    )
}

export default CustomAlert;
