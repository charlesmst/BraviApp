import { filterApiErrorMessage } from './Axios'

it('should return api error message when available', () => {
  const errorMessage = filterApiErrorMessage({
    response: {
      data: {
        success: false,
        error: "Some Api error"
      }
    }
  })
  expect(errorMessage).toEqual("Some Api error")
})


it('should return exception message when exception is sent without response', () => {
  const errorMessage = filterApiErrorMessage(new Error("Some message"))
  expect(errorMessage).toEqual("Some message")
})

it('should return generic message when unknown error', () => {
  const errorMessage = filterApiErrorMessage({ some: "variable" })
  expect(errorMessage).toEqual("An error has occured")
})

it('should read asp net error', () => {
  const error = { "errors": { "Name": ["The field Name must be a string or array type with a maximum length of '500'."] }, "title": "One or more validation errors occurred.", "status": 400, "traceId": "0HLR8740GM19M:00000029" }
  const errorMessage = filterApiErrorMessage({
    response: {
      data: error
    }
  })
  expect(errorMessage).toEqual("The field Name must be a string or array type with a maximum length of '500'.")
})