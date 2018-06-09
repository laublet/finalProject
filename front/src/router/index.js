import Vue from 'vue';
import Router from 'vue-router';
import Header from '@/sharedComponents/Header';
import Product from '@/sharedComponents/Product';
import ProductUser from '@/sharedComponents/ProductUser';
import Auth from '@/modules/auth/Auth';
import Login from '@/modules/auth/components/Login';
import Signup from '@/modules/auth/components/Signup';
import NewProduct from '@/modules/newProduct/NewProduct';
import List from '@/modules/list/List';
import ProductsList from '@/modules/list/components/ProductsList';
// import Home from "@/modules/home/Home";
// import Messages from "@/modules/messages/Messages";
// import MessagesList from "@/modules/messages/components/MessagesList";
// import MessagesDetail from "@/modules/messages/components/MessagesDetail";
// import User from "@/modules/user/User";
// import UserList from "@/modules/user/components/UserList";
// import UserDetail from "@/modules/user/components/UserDetail";
// import SendMessages from "@/sharedComponents/SendMessages";

// LAZY LOAD
const Messages = (resolve) => {
  require.ensure(
    ['../modules/messages/Messages'],
    () => {
      resolve(require('../modules/messages/Messages'));
    },
    'messages',
  );
};
const MessagesList = (resolve) => {
  require.ensure(
    ['../modules/messages/components/MessagesList'],
    () => {
      resolve(require('../modules/messages/components/MessagesList'));
    },
    'messages',
  );
};
const MessagesDetail = (resolve) => {
  require.ensure(
    ['../modules/messages/components/MessagesDetail'],
    () => {
      resolve(require('../modules/messages/components/MessagesDetail'));
    },
    'messages',
  );
};
const SendMessages = (resolve) => {
  require.ensure(
    ['../sharedComponents/SendMessages.vue'],
    () => {
      resolve(require('../sharedComponents/SendMessages.vue'));
    },
    'user',
  );
};
const Home = (resolve) => {
  require.ensure(
    ['../modules/home/Home'],
    () => {
      resolve(require('../modules/home/Home'));
    },
    'Home',
  );
};
const Profile = (resolve) => {
  require.ensure(
    ['../modules/profile/Profile'],
    () => {
      resolve(require('../modules/profile/Profile'));
    },
    'Profile',
  );
};
const ProfileEdit = (resolve) => {
  require.ensure(
    ['../modules/profile/components/ProfileEdit'],
    () => {
      resolve(require('../modules/profile/components/ProfileEdit'));
    },
    'Profile',
  );
};
const ProfileDelete = (resolve) => {
  require.ensure(
    ['../modules/profile/components/ProfileDelete'],
    () => {
      resolve(require('../modules/profile/components/ProfileDelete'));
    },
    'Profile',
  );
};
const ProductsListUser = (resolve) => {
  require.ensure(
    ['../modules/profile/components/ProductsListUser'],
    () => {
      resolve(require('../modules/profile/components/ProductsListUser'));
    },
    'Profile',
  );
};

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'auth',
      components: {
        default: Auth,
      },
      children: [
        {
          path: '',
          name: 'login',
          component: Login,
        },
        {
          path: 'signup',
          name: 'signup',
          component: Signup,
        },
      ],
    },
    {
      path: '/home',
      name: 'home',
      components: {
        default: Home,
        header: Header,
      },
    },
    {
      path: '/newProduct',
      name: 'newProduct',
      components: {
        default: NewProduct,
        header: Header,
      },
    },
    {
      path: '/list',
      name: 'list',
      components: {
        default: List,
        header: Header,
      },
      children: [
        {
          path: '',
          name: 'productsList',
          component: ProductsList,
        },
      ],
    },
    {
      path: '/sendMessages',
      name: 'sendMessages',
      components: {
        default: SendMessages,
        header: Header,
      },
    },
    {
      path: '/messages',
      name: 'messages',
      components: {
        default: Messages,
        header: Header,
      },
      children: [
        {
          path: '',
          name: 'messagesList',
          component: MessagesList,
        },
        {
          path: ':ID',
          name: 'messagesDetail',
          component: MessagesDetail,
        },
      ],
    },
    {
      path: '/profile',
      name: 'profile',
      components: {
        default: Profile,
        header: Header,
      },
      children: [
        {
          path: '',
          name: 'profileEdit',
          component: ProfileEdit,
        },
        {
          path: '/delete',
          name: 'profileDelete',
          component: ProfileDelete,
        },
        {
          path: '/productsListUser',
          name: 'productsListUser',
          component: ProductsListUser,
        },
      ],
    },
    {
      path: 'product/:id',
      name: 'productDetail',
      components: {
        default: Product,
        header: Header,
      },
    },
    {
      path: 'productUser/:id',
      name: 'productUser',
      components: {
        default: ProductUser,
        header: Header,
      },
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
