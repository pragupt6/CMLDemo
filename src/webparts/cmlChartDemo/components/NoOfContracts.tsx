import * as React from 'react';
import {Line} from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import pnp from "@pnp/pnpjs";
import * as Fabric from 'office-ui-fabric-react';
const data = {
    labels: [],
    datasets: [
      {
        label: '# of contracts',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        spanGaps: true,
        showLine: true,
        data: []
      }
    ],
    plugins: {
        datalabels: {
           display: true,
           color: 'white'
        }
     }
  };
function NoOfContracts(props) {
  var content = null;
  let [loading, setLoading] = React.useState(true)
  let [hasError, setError] = React.useState(false)
  let[sumData, setSumData] = React.useState(0)
  let jan = 0, feb = 0, mar = 0, apr = 0, may = 0, jun = 0, jul = 0, aug = 0, sep = 0, oct = 0, nov = 0, dec = 0;
  let month = [];
  let chartData = [];
  React.useEffect(() => {
    pnp.setup({
        sp:{
          baseUrl: props.context.pageContext.web.absoluteUrl
        }});
    pnp.sp.web.lists.getByTitle('Open Contracts').items.select('Created').get().then((response) => {
      response.map((item) => {
        switch (new Date(item.Created).getMonth()) {
          case 0:
            jan++;
            break;
          case 1:
            feb++;
            break;
          case 2:
            mar++
            break;
          case 3:
            apr++
            break;
          case 4:
            may++;
            break;
          case 5:
            jun++;
            break;
          case 6:
            jul++;
            break;
          case 7:
            aug++;
            break;
          case 8:
            sep++;
            break;
          case 9:
            oct++;
            break;
          case 10:
            nov++;
            break;
          case 11:
            dec++;
            break;
          default:
            break;
        }
      })
      jan !== 0 ? (month.push("Jan"), chartData.push(jan)) : "";
      feb !== 0 ? (month.push("Feb"), chartData.push(feb)) : "";
      mar !== 0 ? (month.push("Mar"), chartData.push(mar)) : "";
      apr !== 0 ? (month.push("Apr"), chartData.push(apr)) : "";
      may !== 0 ? (month.push("May"), chartData.push(may)) : "";
      jun !== 0 ? (month.push("Jun"), chartData.push(jun)) : "";
      jul !== 0 ? (month.push("Jul"), chartData.push(jul)) : "";
      aug !== 0 ? (month.push("Aug"), chartData.push(aug)) : "";
      sep !== 0 ? (month.push("Sep"), chartData.push(sep)) : "";
      oct !== 0 ? (month.push("Oct"), chartData.push(oct)) : "";
      nov !== 0 ? (month.push("Nov"), chartData.push(nov)) : "";
      dec !== 0 ? (month.push("Dec"), chartData.push(dec)) : "";
      setSumData(sumData=jan+feb+mar+apr+may+jun+jul+aug+sep+oct+nov+dec)
      data.labels = month;
      data.datasets[0].data = chartData;
      setLoading(loading = false)
    }).catch(() => {
      setError(hasError = true)
    });

  }, [loading])
  return (
    <div style={{'textAlign': 'center'}}>
    <h5 style={{'height': '1px'}}>No. of contracts added monthwise 2019</h5>
    <button onClick={()=>{event.preventDefault();setLoading(loading=true)}} style={{'fontSize':'0.8em'}}>Reload</button><br/>
    {loading && !hasError ? <Fabric.Spinner label='Getting data...'></Fabric.Spinner> : (hasError ? <span style={{'lineHeight':'178px', 'color': 'red' }}>something went wrong.</span> :sumData === 0 ? <span style={{'lineHeight':'178px','color':'red'}}>No data to display.</span> : <Line data={data}/>)}
    </div>
  )
}

export default NoOfContracts
