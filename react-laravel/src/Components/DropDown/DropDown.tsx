import { Select } from '@mui/material'
import {MenuItem} from '@mui/material'
import { Category, Customer, DropDownProps, Product } from '../../Types/Types'
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
            {label === "Select Customer" && (cat as Customer)?.name}
            {label === "Add Category" && (cat as Category)?.category_name}
            {label === "product" && (cat as Product)?.name}
        </MenuItem>
        ))}
        </Select>
    </>
  )
}

export default DropDown