import {  useFormik } from "formik";
import React, { useContext, useState} from "react";
import {
  BoldLink, //
  BoxContainer,
  FieldContainer,
  FieldError,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import * as yup from "yup";
import axios from "axios";
import swal from "sweetalert"

/*La contraseña debe tener al entre 8 y 16 caracteres,
al menos un dígito, al menos una minúscula y al menos una mayúscula.*/
const PASSWORD_REGEX= /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
const phoneRegExp =/^\d{7,14}$/;
///^\+[5][0][4]\s(?:9|8|3)[1-9]{7}$/; // Expresion regular para numeros hondureños
//^\d{7,14}$/; // 7 a 14 numeros.


//Yup es la librería para validar los campos de Formik
const validationSchema = yup.object({ // Un esquema de Yup es un objeto inmutable responsable de validar un objeto en este caso un formulario
  nombre:yup.string().min(3, "Ingrese un nombre real").matches(/^^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/, "Ingrese un nombre correcto").required("El nombre es requerido"), //min es una funcion de yup que indica que la cantidad minina a ingresar es 3
  apellido:yup.string().min(3, "Ingrese un apellido real").matches(/^^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/, "Ingrese un apellido correcto").required("El apellido es requerido"),
  correo:yup.string().email("Por favor ingrese un correo válido").required("El correo es requerido"),
  telefono: yup.string().matches(phoneRegExp, "Numero de Telefóno con 8 digitos :"), //Aqui la funcion matches permite validar si el numero ingresado corresponde a lo indicado en la expresion regular
  direccion:yup.string().max(100, "Ingrese una dirección mas corta").min(10, "Ingrese una dirección mas larga"), //La funcio max indica que en el primer paramentro recibido numero maximo de caracteres a ingresar 
  pass: yup.string().matches(PASSWORD_REGEX, "Al menos una mayúscula, una miniscula y un digito").required("La contraseña es requerida"),
  passConfirmation: yup.string().when("pass", {
    is: val => (val && val.length > 0 ? true: false),
    then : yup.string().oneOf([yup.ref("pass")], "Las contraseñas no coninciden") //validacion de que la confirmacion de la contraseña sea igual a la contra
  }),
  

});

export function SignupForm(props) {
  const {switchToSignin}=props;
  const [ success,setSuccess] = useState(null);
  const [ error,setError] = useState(null);

  const onSubmit = async (values) => {
    const { nombre, apellido, correo,telefono, direccion, pass } = values;
    console.log(values);

    swal({
      title: "Terminos y Condiciones",
      text: `Para completar el registro debes aceptar los términos de uso y el procesamiento, tratamiento y transferencia de datos personales.
      Estoy de acuerdo recibir notificaciones y otra información de parte de la aplicación.`,
      icon: "info",
      buttons: true,
      dangerMode: true,
    })
    .then((acepta) => {
      if (acepta) {
        const response =  axios
      .post("http://localhost:4000/api/tienda/crear", {nombre:nombre, apellido:apellido, correo:correo, telefono:telefono, pass:pass, direccion:direccion})
      .then(response => {{
        swal({
          title: "REGISTRO EXITOSO",
          text: response?.data?.message,
          icon: "success",
          button: "Aceptar",
          timer: "1500"});
    };formik.resetForm(); })
      .catch((err) => {
      //  console.log(response);
        //if (err && err.response) setError(err.response.data.message);
        console.log(err)
          swal({
            title: "HA OCURRIDO UN ERROR",
            text: err.response.data.message,
            icon: "error",
            button: "Aceptar",
            timer: "1500"
        });
      });
    if (response && response.data) {
      console.log("Hola")
      setError(null);
      setSuccess(response?.data?.message);
    }
      } else {
        swal("Para usar esta aplicación debe aceptar los terminos y condiciones", {icon: "warning"});
      }
    });
  };


// formik es una libreria que ayuda a validar campos
const formik = useFormik({initialValues: {nombre: "", apellido: "", correo: "", telefono: "", direccion: "", pass: "", passConfirmation: ""},
  validateOnBlur: true,
  onSubmit,
  validationSchema: validationSchema,
});

//sconsole.log("Error: ", formik.errors);

  return (
    <BoxContainer>
      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
          {/* onChange para sincronizar el valor del campo */}
          {/* onBlur para sincronizar la validación del campo */}
          <Input icon="user" type="text" name="nombre" id="nombre" placeholder="Nombre" value={formik.values.nombre} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          <FieldError>{formik.touched.nombre && formik.errors.nombre ? formik.errors.nombre: ""}</FieldError>
        </FieldContainer>

        <FieldContainer>
          <Input type="text" name="apellido" id="apellido" placeholder="Apellido" value={formik.values.apellido} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          <FieldError>{formik.touched.apellido && formik.errors.apellido ? formik.errors.apellido: ""}</FieldError>
        </FieldContainer>

        <FieldContainer>
          <Input type="email" name="correo" id="correo" placeholder="Correo" value={formik.values.correo} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          <FieldError>{formik.touched.correo && formik.errors.correo ? formik.errors.correo: ""}</FieldError>
        </FieldContainer>

        <FieldContainer>
          <Input type="text" name="telefono" id="telefono" placeholder="Telefóno, ej: 88888888" value={formik.values.telefono} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          <FieldError>{formik.touched.telefono && formik.errors.telefono ? formik.errors.telefono: ""}</FieldError>
        </FieldContainer>

        <FieldContainer>
          <Input type="texto" name="direccion" id="direccion" placeholder="Dirección" value={formik.values.direccion} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          <FieldError>{formik.touched.direccion && formik.errors.direccion ? formik.errors.direccion: ""}</FieldError>
        </FieldContainer>

        <FieldContainer>
          <Input type="password" name="pass" id="pass"  placeholder="Contraseña" value={formik.values.pass} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          <FieldError>{formik.touched.pass && formik.errors.pass? formik.errors.pass: ""}</FieldError>
        </FieldContainer>

        <FieldContainer>
          <Input type="password" name="passConfirmation" placeholder="Confirmar Contraseña" value={formik.values.passConfirmation} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          <FieldError>{formik.touched.passConfirmation && formik.errors.passConfirmation ? formik.errors.passConfirmation: ""}</FieldError>
        </FieldContainer>
        <Marginer direction="vertical" margin={25} />
      <SubmitButton type="submit">Registrarse</SubmitButton>
      <Marginer direction="vertical" margin="1em" />

      </FormContainer>

      <MutedLink >
      ¿Ya tienes una cuenta?
        <BoldLink  onClick={switchToSignin}> {/*Al dar click redirecciona al login */}

        Iniciar sesión
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}

export default SignupForm;