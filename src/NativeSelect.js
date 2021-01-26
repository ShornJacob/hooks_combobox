import React, {useEffect, useState} from 'react'
import axios from 'axios'
import NativeSelect from '@material-ui/core/NativeSelect';
import {has, pick, isEmpty} from 'lodash'
//https://codesandbox.io/s/charming-gareth-e6gqs

function ComboSelect(props) {

  
    const [currentSelection, setSelection] = useState('');
    const [combolist, setCombolist] = useState([]);

    const handleChange = event => {
      console.log(event.target.value)
        setSelection(event.target.value)
    }

    useEffect(() => {

        async function getUser() {
            try {
              const response = await axios.get('https://jsonplaceholder.typicode.com/users');   
              if (has(response,'data')) {
                const combolistFromData = response.data.map((obj) =>
                pick(obj, ["id", "name"])
              );
              setCombolist(combolistFromData);

              if (!isEmpty(combolistFromData)) {
                console.log(combolistFromData[0].name);
                setSelection(combolistFromData[0].name);
              }

              }

            } catch (error) {
              console.error(error);
            }
          }

         getUser()

       


      }, []);

    return (
        <div>

<NativeSelect
        value={currentSelection}
        onChange={handleChange}
      >
         {combolist.map(listItem => (<option key={listItem.id} value={listItem.name}>{listItem.name}</option> ))}

</NativeSelect>
            
        </div>
    );
}

export default ComboSelect;