import { useField } from 'formik';
import React, {InputHTMLAttributes} from 'react'
import {Box, FormControl, Input, FormLabel, FormErrorMessage} from "@chakra-ui/react"

type InputTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    placeholder: string;
    name: string;
}
 const InputTextField: React.FC = (props: InputTextFieldProps) => {
    const [field, { error, touched }] = useField(props);    
  
    return (
      <Box my={4}>
        <FormControl isInvalid={error && touched}>
          <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
          <Input type={props.type} {...field} id={field.name} placeholder={props.placeholder} borderRadius="lg" borderWidth="medium" p="20px" />
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
      </Box>
    );
}
export default InputTextField