import { useState } from "react"
import { Form, Label, FormGroup, Input, Button, FormFeedback } from "reactstrap"
import { BACKEND_URL } from "../../consts"
import { useNavigate } from "react-router-dom";
import { IsRequired, MaxLength20, MaxLength30, MinLength3, MinLength6 } from "../../helpers/validations";
import "./styles.css"

export const Login = () => {
    const navigate = useNavigate()
    const [password,setPassword] = useState(false)
    const [loginsData, setLoginsData] = useState({
        email: {
            value: "",
            error: undefined,
            validations: [IsRequired, MinLength3, MaxLength30]

        },
        password: {
            value: "",
            error: undefined,
            validations: [IsRequired, MinLength6, MaxLength20]

        },
    });

    const handleChange = (e) => {
        e.preventDefault();

        const { value, name } = e.target;
        const { validations } = loginsData[name]

        let error;

        for (let i = 0; i < validations.length; i++) {
            const validation = validations[i]
            const errorMessage = validation(value)

            if (errorMessage) {
                error = errorMessage;
                break
            }
        }

        setLoginsData((prev) => {
            return {
                ...prev,
                [name]: {
                    ...prev[name],
                    value,
                    error
                },
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const {
            email: { value: email },
            password: { value: password },
        } = loginsData;

        const formData = {
            email,
            password,
        };


        fetch(`${BACKEND_URL}/user/sign-in`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then((data) => {
                if (data.errors || data.error) {
                    throw data.error
                }
                if (data.status === 403) {
                    setPassword(true)
                }
                else {
                    const { jwt, refreshToken } = data;
                    localStorage.setItem('token', JSON.stringify(jwt))
                    localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
                    navigate("/project")
                }


            })
            .catch((error) => {
                console.log("🚀 ~ error", error)

            })
    }

    return (
        <div className="login-page">
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="emailId">
                        Email
                    </Label>
                    <Input id="emailId" name="email"
                        onChange={handleChange}
                        invalid={!!loginsData.email.error}
                        style={{ width: "300px" }}
                    />
                    {!!loginsData.email.error && (
                        <FormFeedback>{loginsData.email.error}</FormFeedback>
                    )}
                </FormGroup>

                <FormGroup>
                    <Label for="passwordId">
                        Password
                    </Label>
                    <Input id="passwordId" name="password" onChange={handleChange} type={"password"}
                        invalid={!!loginsData.password.error}
                        style={{ width: "300px" }}
                    />
                    {!!loginsData.password.error &&  (
                        <FormFeedback>{loginsData.password.error}</FormFeedback>
                    )}  

                    {!!password &&  (
                        <p style={{color : "red"}}>wrong password</p>)}
                    
                </FormGroup>
                <Button disabled={
                    !!loginsData.password.error ||
                    !!loginsData.email.error ||
                    loginsData.email.value === "" ||
                    loginsData.password.value === ""
                }
                    style={{ position: "absolute", left: "47.8%" }}>
                    Login
                </Button>
            </Form>
        </div>

    )
}