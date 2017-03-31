import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession
} from "amazon-cognito-identity-js";


export class Account {
  constructor(readonly email?: string, readonly authenticated?: boolean) {
  }ø
}
