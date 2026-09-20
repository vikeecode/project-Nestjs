//singnup form fields
const signupFields=[
{
    labelText:"First Name",
    labelFor:"first-name",
    id:"first-name",
    name:"first-name",
    type:"text",
    autoComplete:"given-name",
    isRequired:true,
    placeholder:"First Name"
},
{
labelText:"Last Name",
labelFor:"last-name",
id:"last-name",
name:"last-name",
type:"text",
autoComplete:"family-name",
isRequired:true,
placeholder:"Last Name"
},
{
labelText:"Email address",
labelFor:"email-address",
id:"email-address",
name:"email",
type:"email",
autoComplete:"email",
isRequired:true,
placeholder:"Email address"
},
{
labelText:"Password",
labelFor:"password",
id:"password",
name:"password",
type:"password",
autoComplete:"current-password",
isRequired:true,
placeholder:"Password"
},
{
labelText:"Confirm Password",
labelFor:"confirm-password",
id:"confirm-password",
name:"confirm-password",
type:"password",
autoComplete:"confirm-password",
isRequired:true,
placeholder:"Confirm Password"
}
]
//login form fields
const loginFields=[
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    }
]
export {loginFields,signupFields}