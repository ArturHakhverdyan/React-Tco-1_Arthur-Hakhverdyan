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
<<<<<<< HEAD
  message:{
=======
  massage:{
>>>>>>> e9946482b0a4c13027b48420c686c6c7e01762b8
    value:"",
    error:undefined,
    validations:[IsRequired, MinLength3, MaxLength20],
    
  }
})

  const onSubmit = (e) => {
    e.preventDefault()
<<<<<<< HEAD
    const { name: { value: name }, email: { value: email },message:{value: message} } = contactData
=======
    const { name: { value: name }, email: { value: email },massage:{value: massage} } = contactData
>>>>>>> e9946482b0a4c13027b48420c686c6c7e01762b8

    const formData = {
      name,
      email,
<<<<<<< HEAD
      message,
=======
      message:massage,
>>>>>>> e9946482b0a4c13027b48420c686c6c7e01762b8
      
    }

    fetch(`${BACKEND_URL}/form`,{
      method:"POST",
<<<<<<< HEAD
      body:JSON.stringify( formData),
      headers: {"Content-type" : "application/json"}
=======
      body:JSON.stringify(formData),
      headers:{"Content-Type":"application/json"}

>>>>>>> e9946482b0a4c13027b48420c686c6c7e01762b8
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
          message
        </Label>
        <Input style={{ width: '300px' }}
          id='massageId'
          name='message'
          onChange={contactChange}
          invalid={!!contactData.message.error}
        />
        {!!contactData.message.error && (
                    <FormFeedback>{contactData.message.error}</FormFeedback>
                )}
      </FormGroup>
      <Button onClick={onSubmit}>
          Submit
         </Button>
    </Form>
  )
}
