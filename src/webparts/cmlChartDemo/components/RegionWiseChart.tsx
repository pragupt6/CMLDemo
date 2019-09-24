import * as React from 'react';
import {Polar} from 'react-chartjs-2';
import pnp from "@pnp/pnpjs";
import * as Fabric from 'office-ui-fabric-react';
const data = {
    datasets: [{
      data: [],
      backgroundColor: [
        '#FF6384',
        '#4BC0C0',
        '#FFCE56',
        '#E7E9ED',
      ],
      label: 'My dataset' // for legend
    }],
    labels: [
      'AMER',
      'APAC',
      'EMEA',
      'Global',
    ]
  };
function RegionWiseChart(props) {
  var content = null;
	let[loading, setLoading] = React.useState(true)
  let[hasError, setError] = React.useState(false)
  let[sumData, setSumData] = React.useState(0)
	let amer=0,apac=0,emea=0,global=0;
    React.useEffect(() => {
        pnp.setup({
            sp:{
              baseUrl: props.context.pageContext.web.absoluteUrl
            }});
      const filterQuery = "Region eq 'AMER' or Region eq 'APAC' or Region eq 'EMEA' or Region eq 'Global'"
          pnp.sp.web.lists.getByTitle('Open Contracts').items.filter(filterQuery).select('Region').get().then((response) => {
          response.map((item) => {
          item.Region==="AMER" ? amer++ : (item.Region==="APAC" ? apac++ : (item.Region==="EMEA" ? emea++ : global++))
        })
        data.datasets[0].data=[amer, apac, emea, global]
        setSumData(sumData=amer+apac+emea+global)
        setLoading(loading=false)
          }).catch(() => {
        setError(hasError=true)
      });
  
      },[loading]) 
  return (
    <div style={{'textAlign': 'center'}}>
    <h5 style={{'height': '1px'}}>Region wise contracts 2019</h5>
    <button onClick={()=>{event.preventDefault();setLoading(loading=true)}} style={{'fontSize':'0.8em'}}>Reload</button><br/>
    {loading && !hasError ? <Fabric.Spinner label='Getting data...'></Fabric.Spinner> : (hasError ? <span style={{'lineHeight':'178px','color':'red'}}>something went wrong.</span>:sumData === 0 ? <span style={{'lineHeight':'178px','color':'red'}}>No data to display.</span> : <Polar data={data} />)}
    </div>
  )
}

export default RegionWiseChart
