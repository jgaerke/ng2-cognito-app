import {Injectable, Inject} from "@angular/core";
import * as AWS from "aws-sdk";
import {CognitoUserPool, CognitoUser, CognitoUserSession, ISignUpResult} from "amazon-cognito-identity-js";
import {LocalStorageService} from "../storage/local-storage.service";
import {SessionService} from "../session/session.service";

@Injectable()
export class CognitoService {

  private region: string;
  private userPoolId: string;
  private clientId: string;
  private identityPoolId: string;
  private userPool: CognitoUserPool;

  constructor(private localStorageService: LocalStorageService) {
    AWS.config.region = this.region = 'us-east-2';
    this.userPoolId = 'us-east-2_Xdq47G1MW';
    this.clientId = '7uf0rdo1fo181c3qghheno62p1';
    this.identityPoolId = 'us-east-2:0479d30f-92dc-43eb-9dda-39feb1cca15d';
    this.userPool = new CognitoUserPool({
      UserPoolId: this.userPoolId,
      ClientId: this.clientId
    });
  }

  getUserPool() {
    return this.userPool;
  }

  createUser(email: string): CognitoUser {
    return new CognitoUser({
      Username: email,
      Pool: this.userPool
    });
  }
}
