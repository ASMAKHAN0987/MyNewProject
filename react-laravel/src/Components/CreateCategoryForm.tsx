import { Container, TextField } from '@mui/material';
import { Button } from '@mui/material';
const CreateCategoryForm = () => {
  return (
    <>
      <Container>
       <form method='post' action='#' >
       <TextField id="outlined-basic" label="Add Category" variant="outlined" sx={{width:"100%",height:"100%"}}/>
       <Button variant="contained">Submit</Button>
       </form>
      </Container>
    </>
  )
}

export default CreateCategoryForm