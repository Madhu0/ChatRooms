class BaseController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  sendAsJson(resp, status) {
    this.res.setHeader('Content-Type', 'application/json');

    this.res.status(status);
    this.res.write(JSON.stringify(resp));
    this.res.end();
  }
}

module.exports = BaseController;