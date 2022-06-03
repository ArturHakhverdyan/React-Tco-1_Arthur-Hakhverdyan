import { useState } from "react";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { BACKEND_URL } from "../../consts";
import { IsRequired, MaxLength20, MinLength3 } from "../../helpers/validations";


export const ContactPage = () => {
const [contactData ,setContactData] = useState({
  name:{
    value:'',
    error:undefined,
    validations:[IsRequired, MinLength3, MaxLength20]
  },
  email:{
    value:'',
    error:undefined,
    validations:[IsRequired, MinLength3, MaxLength20]
  },
  massage:{
    name:"",
    error:undefined,
    validations:[IsRequired, MinLength3, MaxLength20],
    
  }
})

  const onSubmit = (e) => {
    e.preventDefault()
    const { name: { value: name }, email: { value: email },massage:{name: massage} } = contactData

    const formData = {
      name,
      email,
      massage,
      
    }

    fetch(`${BACKEND_URL}/form`,{
      method:"POST",
      body:JSON.stringify({ formData})
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        throw data.error
    }
      console.log(data)}).catch("error")
   }

   const contactChange = (e) => {
    const { value, name } = e.target;
    const { validations } = contactData[name];

    let error;

    for (let i = 0; i < validations.length; i++) {
        const validation = validations[i]
        const errorMessage = validation(value)

        if (errorMessage) {
            error = errorMessage;
            break;
        }
    }

    setContactData((prev) => {
        return {
            ...prev,
            [name]: {
                ...prev[name],
                value,
                error
            },
        };
    });
  }
  return (
    <Form >
      <FormGroup>
        <Label for="nameId">
          Name
        </Label>
        <Input style={{ width: '300px' }}
          id='nameId'
          name='name'
          onChange={contactChange}
          invalid={!!contactData.name.error}
        />
         {!!contactData.name.error && (
                    <FormFeedback>{contactData.name.error}</FormFeedback>
                )}
        <Label for="emailId">
          Email
        </Label>
        <Input style={{ width: '300px' }}
          id='emailId'
          name='email'
          onChange={contactChange}
          invalid={!!contactData.email.error}
        />
        {!!contactData.email.error && (
                    <FormFeedback>{contactData.email.error}</FormFeedback>
                )}
        
        <Label for="massageId">
          Massage
        </Label>
        <Input style={{ width: '300px' }}
          id='massageId'
          name='massage'
          onChange={contactChange}
          invalid={!!contactData.massage.error}
        />
        {!!contactData.massage.error && (
                    <FormFeedback>{contactData.massage.error}</FormFeedback>
                )}
      </FormGroup>
      <Button onClick={onSubmit}>
          Submit
         </Button>
    </Form>
  )
}
