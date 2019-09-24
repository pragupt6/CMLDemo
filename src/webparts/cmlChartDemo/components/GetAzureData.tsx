import * as React from 'react';
import * as Fabric from 'office-ui-fabric-react';
import { values } from '@uifabric/utilities';
import $ from 'jquery';
import { TextField } from 'office-ui-fabric-react';
let orderNumber='',status='',type='', key1='',key2='',orderDate='';
var content = null;
var isError=false;
function GetAzureData() {
    let [oNumber, setoNumber] = React.useState('')
    let url = `https://shstorage1234.table.core.windows.net/shtabledata?sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2019-08-31T14:51:11Z&st=2019-08-22T06:51:11Z&spr=https&sig=q%2FKUBOmP5yXvwF0Mljvoge6fHgLRYZW5fAaQLnyZUKc%3D&$filter=PartitionKey eq '${oNumber}'`
    let [loading, setLoading] = React.useState(false)
     React.useEffect( () =>  {
        //setError(hasError=false)
        isError=false;
    async function callAJAX(){ 
        content = null;
        var _reprojected_lat_lng =  await $.ajax({
            type: 'GET',
            dataType: "json",
            data: {},
            url: url,
            success: function (jqXHR, textStatus, errorThrown) {
                console.log('Data=', jqXHR);
                if(jqXHR.value.length>0){
                orderNumber = jqXHR.value[0].OrderNumber;
                status = jqXHR.value[0].OrderStatus;
                type = jqXHR.value[0].OrderType;
                key1 = jqXHR.value[0].PartitionKey;
                key2 = jqXHR.value[0].RowKey;
                orderDate = jqXHR.value[0].Timestamp;

                content = <div>
                <p style={{ 'height': '1px', 'paddingLeft': '10px' }}>Order Number: {orderNumber}</p>
                <p style={{ 'height': '1.5px', 'paddingLeft': '10px' }}>Order Status: {status}</p>
                <p style={{ 'height': '1.5px', 'paddingLeft': '10px' }}>Order Type: {type}</p>
                <p style={{ 'height': '1.5px', 'paddingLeft': '10px' }}>Partition Key: {key1}</p>
                <p style={{ 'height': '1.5px', 'paddingLeft': '10px' }}>Row Key: {key2}</p>
                <p style={{ 'height': '1px', 'paddingLeft': '10px' ,'paddingBottom': '10px'}}>Order Date: {orderDate}</p>
                </div>
                setLoading(loading=false)
            }else{
                //setError(hasError=true)
                isError = true;
                setLoading(loading=false)
            }
                //console.log('Data=', jqXHR);
                //console.log('Order Number=', jqXHR.value[0].OrderNumber);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error but Data=", jqXHR.status)
                console.log(textStatus)
                //setError(hasError=true)
                isError = true;
                setLoading(loading=false)
            },
    
        });
    }
    if(oNumber!==''){
        callAJAX()
    }
    },[loading])

    return (

        <div className="container">
            <h5 style={{ 'height': '1px', 'textAlign': 'center' }}>Calling a Azure Function from client</h5>
            <div style={{ 'padding': '10px' }} className="ms-Grid-col ms-u-sm8 block"><input onChange={(e)=>{setoNumber(oNumber=e.target.value)}} style={{ 'height': '26px', 'width':'200px' }} type='text' placeholder='Enter Partition key. Hint: Order2' />&nbsp;&nbsp;&nbsp;&nbsp;<Fabric.PrimaryButton disabled={oNumber===''} onClick={()=>setLoading(loading=true)}>Get Order Details</Fabric.PrimaryButton></div>
            {loading && !isError ? <Fabric.Spinner label='Getting data...'></Fabric.Spinner> : ((isError ? <span style={{'alignSelf':'center','paddingLeft':'200px', 'lineHeight':'100px', 'color': 'red' }}>No details found.</span> : content)) }

        </div>

    )
}

export default GetAzureData
