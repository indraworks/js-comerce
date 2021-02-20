import { getUserInfo } from '../localStorage';
const Header = {
  render: () => {
    const { name } = getUserInfo();

    return `

      <div>
            <a href="/#/">JS AMAZONA</a>
          </div>
            <div class='header-in'>
            
               ${
                 name
                   ? `<a href="/#/profile">${name}</a>`
                   : ` <a href="/#/signin">Sign-In</a>`
               }
             
              <a href="/#/">Cart</a>
            </div>
   `;
  },
  after_render: () => {},
};
export default Header;
