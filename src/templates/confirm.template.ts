export const confirmEmailTemplate = (link: string) => {
  return `
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
    <tbody>
      <tr align="center">
        <td>
          <table align="center" border="0" cellpadding="0" cellspacing="0"
            style="border-collapse: collapse; min-width: 433px">
            <tr align="center">
              <td>
                <table align="center" cellspacing="0" cellpadding="0" style="box-sizing: border-box;">
                  <tbody>
                    <tr align="center">
                      <td>
                        <table align="center" cellspacing="0" cellpadding="0" style="box-sizing: border-box;">
                          <tr align="center">
                            <td align="center">
                              <img style="width: 50px; height: 50px; margin: 10px 0;"
                                src="data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27UTF-8%27?%3e%3csvg%20id=%27_%EB%A0%88%EC%9D%B4%EC%96%B4_2%27%20data-name=%27%EB%A0%88%EC%9D%B4%EC%96%B4_2%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20viewBox=%270%200%20146.28%20110.85%27%3e%3cdefs%3e%3cstyle%3e%20.cls-1%20{%20fill:%20url(%23yellowgrad);%20stroke:%20%23861405;%20stroke-miterlimit:%2010;%20stroke-width:%203px;%20}%20%3c/style%3e%3clinearGradient%20id=%27yellowgrad%27%20x1=%2773.77%27%20y1=%27-1.92%27%20x2=%2772.55%27%20y2=%27125.82%27%20gradientUnits=%27userSpaceOnUse%27%3e%3cstop%20offset=%270%27%20stop-color=%27%23faee00%27/%3e%3cstop%20offset=%271%27%20stop-color=%27%23f7ae2d%27/%3e%3c/linearGradient%3e%3c/defs%3e%3cg%20id=%27logo%27%3e%3cpath%20id=%27logo-2%27%20data-name=%27logo%27%20class=%27cls-1%27%20d=%27M117.8,109.35H11.5c-5.52,0-10-4.48-10-10s4.48-10,10-10h25.43v-35.8c-9.94-3.98-16.99-13.72-16.99-25.07,0-14.88,12.11-26.99,26.99-26.99s26.99,12.11,26.99,26.99c0,11.35-7.04,21.08-16.99,25.07v35.8s50.87,0,50.87,0v-35.8c-9.94-3.98-16.99-13.72-16.99-25.07,0-14.88,12.11-26.99,26.99-26.99s26.99,12.11,26.99,26.99c0,11.35-7.04,21.08-16.99,25.07v45.8c0,5.52-4.48,10-10,10ZM117.8,21.5c-3.85,0-6.99,3.13-6.99,6.99s3.13,6.99,6.99,6.99,6.99-3.13,6.99-6.99-3.13-6.99-6.99-6.99ZM46.93,21.5c-3.85,0-6.99,3.13-6.99,6.99s3.13,6.99,6.99,6.99,6.99-3.13,6.99-6.99-3.13-6.99-6.99-6.99Z%27/%3e%3c/g%3e%3c/svg%3e" />
                            </td>
                          </tr>
                        </table>
                        <table align="center" cellspacing="0" cellpadding="0" style="box-sizing: border-box;">
                          <tr align="center">
                            <td align="center">
                              <div style="font-size: 1.5rem; margin-bottom: 1rem;">Confirm your email address</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table align="center" cellspacing="0" cellpadding="0" style="box-sizing: border-box;">
                  <tbody>
                    <tr align="center">
                      <td align="center"
                        style="border-style: solid; border-width: 1px; border-color: #ccc; border-radius: 5px;">
                        <table align="center" cellspacing="0" cellpadding="0" style="box-sizing: border-box;">
                          <tr align="center">
                            <td style="padding: 20px;">
                              <table align="center" cellspacing="0" cellpadding="0" style="box-sizing: border-box;">
                                <tbody>
                                  <tr align="center">
                                    <td align="center">
                                      <h4>
                                        IFELFI email address confirm
                                      </h4>
                                    </td>
                                  </tr>
                                  <tr align="center">
                                    <td style="height: 10px;"></td>
                                  </tr>
                                  <tr align="center">
                                    <td>
                                      <p>
                                        Click the button below to confirm your email address
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table align="center" cellspacing="0" cellpadding="0" style="box-sizing: border-box;">
                                <tr align="center">
                                  <td style="height: 20px;"></td>
                                </tr>
                              </table>
                              <table border="0" align="center" cellpadding="0" cellspacing="0"
                                style="box-sizing: border-box;">
                                <tbody>
                                  <tr align="center">
                                    <td align="center">
                                      <a href="${link}" style="padding: 10px 20px; background-color: #ff731c; color: #fff; text-decoration: none; font-size: 1rem; font-weight: bold; border-radius: 5px; position: relative; 
                                        display: inline-block;
                                        ">Confirm
                                        email</a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  `;
};
