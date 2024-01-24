// we can use like this  

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
       Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error));
     };
   };
   
   // const asyncHandler = (fn) => async () => {
   //   try {
   //     await fn(req, res, next);
   //   } catch (error) {
   //     res.staus(error.code || 500).json({
   //       success: false,
   //       message: error.message,
   //     });
   //   }
   // };
   
   export {asyncHandler}
   