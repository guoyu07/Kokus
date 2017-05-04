import Path from 'path-parser';

const scopeMiddleware = (req, res, next) => {
    const { decoded } = req;
    const scopes =  [
          'ROOMS',
          'ROOMS.EVENTS'
        ];
    const parser = Path.createPath('/rooms/:id');
    console.log(parser.test(req.url));
    next();
    // Verify the token from headers
};

export default scopeMiddleware;