import { useField } from 'formik';
import React, {InputHTMLAttributes} from 'react'
import {Box, FormControl, Input, FormLabel, FormErrorMessage, Textarea, useColorMode} from "@chakra-ui/react"

type InputTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    placeholder: string;
    name: string;
    isTextArea?: boolean
}
 const InputTextField: React.FC = (props: InputTextFieldProps) => {
    const [field, { error, touched }] = useField(props);
    const HeaderBgColor = { light: "primary", dark: "#fe4500" };
    const { colorMode } = useColorMode();

  
    return (
      <Box my={4}>
        <FormControl isInvalid={error && touched}>
          <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
          {
            props.isTextArea ? <Textarea focusBorderColor={HeaderBgColor[colorMode]} type={props.type} {...field} id={field.name} placeholder={props.placeholder} borderRadius="lg" borderWidth="medium" p="20px" /> 
           : <Input  type={props.type} focusBorderColor={HeaderBgColor[colorMode]} {...field} id={field.name} placeholder={props.placeholder} borderRadius="lg" borderWidth="medium" p="20px" />
          }
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
      </Box>
    );
}
export default InputTextField