import React from 'react';
import Flag from './flag';
import { ColumnChart } from 'react-chartkick';

window.Chart = require('chart.js');

const xTitle = 'age';
const yTitle = '% mortalité';

const MortalityListItem = ({mortality}) => {
    
    const formatDataMale = formatMortalityData(mortality.male);
    const formatDataFemale = formatMortalityData(mortality.female);

    return (
        <tr>
            <td>
                <Flag country={mortality.country} className='flag_medium'/>      
            </td>
            <td className='col-md-6'>
                <ColumnChart  xtitle={xTitle} ytitle={yTitle} data={formatDataMale} />
            </td>
            <td className='col-md-6'>
                <ColumnChart  xtitle={xTitle} ytitle={yTitle} data={formatDataFemale} />
            </td> 
        </tr>
    )
}

function formatMortalityData(mortality) {
    const filterData = mortality.filter((data) => {
        if (data.age >= 101) {
            return false;
        } else {
            return data;
        }
    });
    const array = filterData.map((data) => {
        return [Number((data.age).toFixed(0)),Number(data.mortality_percent.toFixed(0))]; 
    })    
    return array;
}

export default MortalityListItem;