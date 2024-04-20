import { getMany } from "../dataprovider"

export const TestPage = () => {

    const {data, isLoading, isError} = getMany({resource: "notes"})
    console.log(data)
    console.log(isLoading)
    console.log(isError)
    
    return (<></>)
    
}