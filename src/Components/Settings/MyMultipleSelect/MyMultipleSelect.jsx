import React from 'react';
import { Select } from 'antd';
// import 'antd/dist/antd.css'; // Импортируйте стили Ant Design
import './MyMultipleSelect.scss'
import axios from 'axios';
const { Option } = Select;

function MyMultipleSelect({writer}) {
  const [writersList, setWritersList] = React.useState([])
  const [selectedValue, setSelectedValue] = React.useState([])

  React.useEffect(() => {
    setSelectedValue(writer.projects)
  }, [writer.projects])

  React.useEffect(() => {
    axios.get(`https://dimpom-4d9fe-default-rtdb.firebaseio.com/works.json`)
      .then(d => {
        setWritersList(addDataToState(d.data))
      })
  }, [])

  function addDataToState(obj) {
    let arr = []
    for (const key in obj) {
      let newObj = {
        id: key,
        ...obj[key]
      }
      
      arr.push(newObj)
    }
    return arr
  }
  
  const handleChange = (selectedValues) => {
    writer['projects'] = selectedValues
    setSelectedValue(selectedValues)
  };
  
  return (
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Выберите произведении"
      onChange={handleChange}
      notFoundContent='Такой произведении нет'
      maxTagCount={3}
      className='select-writters'
      value={selectedValue}
    >
      {
        writersList.map(obj => {
          return <Option key={obj.id} value={obj.id}>{obj.name}</Option>
        })
      }
    </Select>
  );
}

export default MyMultipleSelect;
