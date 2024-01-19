import { Select } from '@mui/material'
import {MenuItem} from '@mui/material'
import { Category, Customer, DropDownProps, Product } from '../../Types/Types'
import { Selects } from '../../utility/constant'
const DropDown = ({selectData,handleChange,dropDowndata,label,id}:DropDownProps) => {
  return (
    <>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectData}
            label={label&& label}
            onChange={(e)=>handleChange(e,id)}
        >
        {dropDowndata?.map((cat) => (
        <MenuItem key={cat?.id} value={cat?.id}>
            {label === Selects.SELECT_CUSTOMER && (cat as Customer)?.name}
            {label === Selects.ADD_CATEGORY && (cat as Category)?.category_name}
            {label === Selects.PRODUCT && (cat as Product)?.name}
        </MenuItem>
        ))}
        </Select>
    </>
  )
}

export default DropDown