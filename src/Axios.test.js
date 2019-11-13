import {filterApiErrorMessage} from './Axios'

it('should return api error message when available',()=>{
  const errorMessage = filterApiErrorMessage({
    response:{
      data:{
        success:false,
        error:"Some Api error"
      }
    }
  })
  expect(errorMessage).toEqual("Some Api error")
})


it('should return exception message when exception is sent without response',()=>{
  const errorMessage = filterApiErrorMessage(new Error("Some message"))
  expect(errorMessage).toEqual("Some message")
})

it('should return generic message when unknown error',()=>{
  const errorMessage = filterApiErrorMessage({some:"variable"})
  expect(errorMessage).toEqual("An error has occured")
})