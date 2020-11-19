declare module '@microsoft/teams-js' {
  export = microsoftTeams;
}
declare namespace microsoftTeams {
  export const version = "1.7.0";
  /**
   * This is the SDK version when all SDK APIs started to check platform compatibility for the APIs.
   */
  export const defaultSDKVersionForCompatCheck = "1.6.0";
  /**
   * List of supported Host origins
   */
  export const validOrigins: string[];
  export const validOriginRegExp: RegExp;
  /**
   * USer specified message origins should satisfy this test
   */
  export const userOriginUrlValidationRegExp: RegExp;
  export class GlobalVars {
      static initializeCalled: boolean;
      static initializeCompleted: boolean;
      static additionalValidOrigins: string[];
      static additionalValidOriginsRegexp: RegExp;
      static initializeCallbacks: {
          (): void;
      }[];
      static currentWindow: Window | any;
      static parentWindow: Window | any;
      static isFramelessWindow: boolean;
      static parentOrigin: string;
      static frameContext: FrameContexts;
      static childWindow: Window;
      static childOrigin: string;
      static parentMessageQueue: MessageRequest[];
      static childMessageQueue: MessageRequest[];
      static nextMessageId: number;
      static handlers: {
          [func: string]: Function;
      };
      static callbacks: {
          [id: number]: Function;
      };
      static hostClientType: string;
      static clientSupportedSDKVersion: string;
      static printCapabilityEnabled: boolean;
      static themeChangeHandler: (theme: string) => void;
      static fullScreenChangeHandler: (isFullScreen: boolean) => void;
      static backButtonPressHandler: () => boolean;
      static loadHandler: (context: LoadContext) => void;
      static beforeUnloadHandler: (readyToUnload: () => void) => boolean;
      static changeSettingsHandler: () => void;
      static onStartConversationHandler: (conversationResponse: ConversationResponse) => void;
      static onCloseConversationHandler: (conversationResponse: ConversationResponse) => void;
      static getLogHandler: () => string;
      static appButtonClickHandler: () => void;
      static appButtonHoverEnterHandler: () => void;
      static appButtonHoverLeaveHandler: () => void;
      static meetingRoomCapabilitiesUpdateHandler: (capabilities: meetingRoom.MeetingRoomCapability) => void;
      static meetingRoomStatesUpdateHandler: (states: meetingRoom.MeetingRoomState) => void;
  }
  /**
   * @private
   * Hide from docs
   * Shim in definitions used for browser-compat
   */
  export interface DOMMessageEvent {
      origin?: any;
      source?: any;
      data?: any;
      originalEvent: DOMMessageEvent;
  }
  /**
   * @private
   * Hide from docs
   */
  export interface TeamsNativeClient {
      framelessPostMessage(msg: string): void;
  }
  /**
   * @private
   * Hide from docs
   */
  export interface ExtendedWindow extends Window {
      nativeInterface: TeamsNativeClient;
      onNativeMessage(evt: DOMMessageEvent): void;
  }
  export interface MessageRequest {
      id?: number;
      func: string;
      args?: any[];
  }
  export interface MessageResponse {
      id: number;
      args?: any[];
  }
  /**
   * Meant for Message objects that are sent to children without id
   */
  export interface DOMMessageEvent {
      func: string;
      args?: any[];
  }
  export function ensureInitialized(...expectedFrameContexts: string[]): void;
  /**
   * Checks whether the platform has knowledge of this API by doing a comparison
   * on API required version and platform supported version of the SDK
   * @param requiredVersion SDK version required by the API
   */
  export function isAPISupportedByPlatform(requiredVersion?: string): boolean;
  export function processMessage(evt: DOMMessageEvent): void;
  export function handleParentMessage(evt: DOMMessageEvent): void;
  /**
   * Processes the valid origins specifuied by the user, de-duplicates and converts them into a regexp
   * which is used later for message source/origin validation
   */
  export function processAdditionalValidOrigins(validMessageOrigins: string[]): void;
  export function waitForMessageQueue(targetWindow: Window, callback: () => void): void;
  /**
   * Send a message to parent. Uses nativeInterface on mobile to communicate with parent context
   */
  export function sendMessageRequestToParent(actionName: string, args?: any[]): number;
  /**
   * Send a custom message object that can be sent to child window,
   * instead of a response message to a child
   */
  export function sendMessageEventToChild(actionName: string, args?: any[]): void;
  /**
   * Helper function to create a blob from media chunks based on their sequence
   */
  export function createFile(assembleAttachment: media.AssembleAttachment[], mimeType: string): Blob;
  /**
   * Helper function to convert Media chunks into another object type which can be later assemebled
   * Converts base 64 encoded string to byte array and then into an array of blobs
   */
  export function decodeAttachment(attachment: media.MediaChunk, mimeType: string): media.AssembleAttachment;
  /**
   * Returns true if the mediaInput params are valid and false otherwise
   */
  export function validateSelectMediaInputs(mediaInputs: media.MediaInputs): boolean;
  /**
   * Returns true if the get Media params are valid and false otherwise
   */
  export function validateGetMediaInputs(mimeType: string, format: media.FileFormat, content: string): boolean;
  /**
   * Returns true if the view images param is valid and false otherwise
   */
  export function validateViewImagesInput(uriList: media.ImageUri[]): boolean;
  export function generateRegExpFromUrls(urls: string[]): RegExp;
  export function getGenericOnCompleteHandler(errorMessage?: string): (success: boolean, reason?: string) => void;
  /**
   * Compares SDK versions.
   * @param v1 first version
   * @param v2 second version
   * returns NaN in case inputs are not in right format
   *         -1 if v1 < v2
   *          1 if v1 > v2
   *          0 otherwise
   * For example,
   *    compareSDKVersions('1.2', '1.2.0') returns 0
   *    compareSDKVersions('1.2a', '1.2b') returns NaN
   *    compareSDKVersions('1.2', '1.3') returns -1
   *    compareSDKVersions('2.0', '1.3.2') returns 1
   *    compareSDKVersions('2.0', 2.0) returns NaN
   */
  export function compareSDKVersions(v1: string, v2: string): number;
  /**
   * Generates a GUID
   */
  export function generateGUID(): string;
  /**
   * @private
   * Namespace to interact with bots using the SDK.
   */
  export namespace bot {
      /**
       * @private
       * Hide from docs until release.
       * ------
       * Sends query to bot in order to retrieve data.
       * @param botRequest query to send to bot.
       * @param onSuccess callback to invoke when data is retrieved from bot
       * @param onError callback to invoke should an error occur
       */
      function sendQuery(botRequest: QueryRequest, onSuccess?: (data: QueryResponse) => void, onError?: (error: string) => void): void;
      /**
       * @private
       * Hide from docs until release.
       * -----
       * Retrieves list of support commands from bot
       * @param onSuccess callback to invoke when data is retrieved from bot
       * @param onError callback to invoke should an error occur
       */
      function getSupportedCommands(onSuccess?: (response: Command[]) => void, onError?: (error: string) => void): void;
      /**
       * @private
       * Hide from docs until release.
       * -----
       * Authenticates a user for json tab
       * @param authRequest callback to invoke when data is retrieved from bot
       * @param onSuccess callback to invoke when user is authenticated
       * @param onError callback to invoke should an error occur
       */
      function authenticate(authRequest: AuthQueryRequest, onSuccess?: (results: Results) => void, onError?: (error: string) => void): void;
      interface QueryRequest {
          /**
           * Query to search for
           */
          query: string;
          commandId?: string;
          option?: {
              skip: number;
              count: number;
          };
      }
      interface QueryResponse {
          data: Results | Auth;
          type: ResponseType;
      }
      interface Results {
          attachments: Attachment[];
          layout: any;
          botId: string;
      }
      interface Auth {
          url: string;
          title: string;
      }
      interface AuthQueryRequest extends QueryRequest {
          url: string;
      }
      interface Attachment {
          card: any;
          previewCard: any;
          previewRawPayload: any;
          rawPayload: any;
      }
      interface Command {
          title: string;
          id: string;
          initialRun: boolean;
      }
      enum ResponseType {
          Results = "Results",
          Auth = "Auth"
      }
  }
  /**
   * Namespace to interact with the conversational subEntities inside the tab
   */
  export namespace conversations {
      /**
       * @private
       * Hide from docs
       * --------------
       * Allows the user to start or continue a conversation with each subentity inside the tab
       */
      function openConversation(openConversationRequest: OpenConversationRequest): void;
      /**
       * @private
       * Hide from docs
       * --------------
       * Allows the user to close the conversation in the right pane
       */
      function closeConversation(): void;
  }
  /**
   * @private
   * Hide from docs
   * --------
   * Information about all members in a chat
   */
  export interface ChatMembersInformation {
      members: ThreadMember[];
  }
  /**
   * @private
   * Hide from docs
   * --------
   * Information about a chat member
   */
  export interface ThreadMember {
      /**
       * The member's user principal name in the current tenant.
       */
      upn: string;
  }
  export enum NotificationTypes {
      fileDownloadStart = "fileDownloadStart",
      fileDownloadComplete = "fileDownloadComplete"
  }
  export interface ShowNotificationParameters {
      message: string;
      notificationType: NotificationTypes;
  }
  /**
   * @private
   * Hide from docs.
   * ------
   */
  export interface FilePreviewParameters {
      /**
       * The developer-defined unique ID for the file.
       */
      entityId: string;
      /**
       * The display name of the file.
       */
      title: string;
      /**
       * An optional description of the file.
       */
      description?: string;
      /**
       * The file extension; e.g. pptx, docx, etc.
       */
      type: string;
      /**
       * A url to the source of the file, used to open the content in the user's default browser
       */
      objectUrl: string;
      /**
       * Optional; an alternate self-authenticating url used to preview the file in Mobile clients and offer it for download by the user
       */
      downloadUrl?: string;
      /**
       * Optional; an alternate url optimized for previewing the file in Teams web and desktop clients
       */
      webPreviewUrl?: string;
      /**
       * Optional; an alternate url that allows editing of the file in Teams web and desktop clients
       */
      webEditUrl?: string;
      /**
       * Optional; the base url of the site where the file is hosted
       */
      baseUrl?: string;
      /**
       * Optional; indicates whether the file should be opened in edit mode
       */
      editFile?: boolean;
      /**
       * Optional; the developer-defined unique ID for the sub-entity to return to when the file stage closes.
       * This field should be used to restore to a specific state within an entity, such as scrolling to or activating a specific piece of content.
       */
      subEntityId?: string;
  }
  /**
   * @private
   * Hide from docs
   * --------
   * Query parameters used when fetching team information
   */
  export interface TeamInstanceParameters {
      /**
       * Flag allowing to select favorite teams only
       */
      favoriteTeamsOnly?: boolean;
  }
  /**
   * @private
   * Hide from docs
   * --------
   * Information on userJoined Teams
   */
  export interface UserJoinedTeamsInformation {
      /**
       * List of team information
       */
      userJoinedTeams: TeamInformation[];
  }
  /**
   * Namespace to interact with the logging part of the SDK.
   * This object is used to send the app logs on demand to the host client
   *
   * @private
   * Hide from docs
   */
  export namespace logs {
      /**
       * @private
       * Hide from docs
       * ------
       * Registers a handler for getting app log
       * @param handler The handler to invoke to get the app log
       */
      function registerGetLogHandler(handler: () => string): void;
  }
  export namespace meetingRoom {
      /**
       * @private
       * Hide from docs
       *
       * Data structure to represent a meeting room.
       */
      interface MeetingRoomInfo {
          /**
           * Endpoint id of the meeting room.
           */
          endpointId: string;
          /**
           * Device name of the meeting room.
           */
          deviceName: string;
          /**
           * Client type of the meeting room.
           */
          clientType: string;
          /**
           * Client version of the meeting room.
           */
          clientVersion: string;
      }
      /**
       * @private
       * Hide from docs
       *
       * Enum used to indicate meeting room capabilities.
       */
      enum Capability {
          /**
           * Media control capability: toggle mute.
           */
          toggleMute = "toggleMute",
          /**
           * Media control capability: toggle camera.
           */
          toggleCamera = "toggleCamera",
          /**
           * Media control capability: toggle captions.
           */
          toggleCaptions = "toggleCaptions",
          /**
           * Media control capability: volume ajustion.
           */
          volume = "volume",
          /**
           * Stage layout control capability: show gallery mode.
           */
          showVideoGallery = "showVideoGallery",
          /**
           * Stage layout control capability: show content mode.
           */
          showContent = "showContent",
          /**
           * Stage layout control capability: show content + gallery mode.
           */
          showVideoGalleryAndContent = "showVideoGalleryAndContent",
          /**
           * Stage layout control capability: show laryge gallery mode.
           */
          showLargeGallery = "showLargeGallery",
          /**
           * Stage layout control capability: show together mode.
           */
          showTogether = "showTogether",
          /**
           * Meeting control capability: leave meeting.
           */
          leaveMeeting = "leaveMeeting"
      }
      /**
       * @private
       * Hide from docs
       *
       * Data structure to represent capabilities of a meeting room.
       */
      interface MeetingRoomCapability {
          /**
           * Media control capabilities, value can be "toggleMute", "toggleCamera", "toggleCaptions", "volume".
           */
          mediaControls: string[];
          /**
           * Main stage layout control capabilities, value can be "showVideoGallery", "showContent", "showVideoGalleryAndContent", "showLargeGallery", "showTogether".
           */
          stageLayoutControls: string[];
          /**
           * Meeting control capabilities, value can be "leaveMeeting".
           */
          meetingControls: string[];
      }
      /**
       * @private
       * Hide from docs
       *
       * Data structure to represent states of a meeting room.
       */
      interface MeetingRoomState {
          /**
           * Current mute state, true: mute, false: unmute.
           */
          toggleMute: boolean;
          /**
           * Current camera state, true: camera on, false: camera off.
           */
          toggleCamera: boolean;
          /**
           * Current captions state, true: captions on, false: captions off.
           */
          toggleCaptions: boolean;
          /**
           * Current main stage layout state, value can be one of "Gallery", "Content + gallery", "Content", "Large gallery" and "Together mode".
           */
          stageLayout: string;
          /**
           * Current leaveMeeting state, true: leave, false: no-op.
           */
          leaveMeeting: boolean;
      }
      /**
       * @private
       * Hide from docs
       *
       * Fetch the meeting room info that paired with current client.
       * @param callback Callback to invoke when the meeting room info is fetched.
       */
      function getPairedMeetingRoomInfo(callback: (sdkError: SdkError, meetingRoomInfo: MeetingRoomInfo) => void): void;
      /**
       * @private
       * Hide from docs
       *
       * Send a command to paired meeting room.
       * @param commandName The command name.
       * @param callback Callback to invoke when the command response returns.
       */
      function sendCommandToPairedMeetingRoom(commandName: string, callback: (sdkError: SdkError) => void): void;
      /**
       * @private
       * Hide from docs
       *
       * Registers a handler for meeting room capabilities update.
       * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
       * @param handler The handler to invoke when the capabilities of meeting room update.
       */
      function registerMeetingRoomCapabilitiesUpdateHandler(handler: (capabilities: MeetingRoomCapability) => void): void;
      /**
       * @private
       * Hide from docs
       * Registers a handler for meeting room states update.
       * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
       * @param handler The handler to invoke when the states of meeting room update.
       */
      function registerMeetingRoomStatesUpdateHandler(handler: (states: MeetingRoomState) => void): void;
  }
  /**
   * Namespace to interact with the menu-specific part of the SDK.
   * This object is used to show View Configuration, Action Menu and Navigation Bar Menu.
   *
   * @private
   * Hide from docs until feature is complete
   */
  export namespace menus {
      /**
       * Represents information about item in View Configuration.
       */
      interface ViewConfiguration {
          /**
           * Unique identifier of view.
           */
          id: string;
          /**
           * Display title of the view.
           */
          title: string;
          /**
           * Additional information for accessibility.
           */
          contentDescription?: string;
      }
      /**
       * Represents information about menu item for Action Menu and Navigation Bar Menu.
       */
      class MenuItem {
          /**
           * Unique identifier for the menu item.
           */
          id: string;
          /**
           * Display title of the menu item.
           */
          title: string;
          /**
           * Display icon of the menu item. The icon value must be a string having SVG icon content.
           */
          icon: string;
          /**
           * Selected state display icon of the menu item. The icon value must be a string having SVG icon content.
           */
          iconSelected?: string;
          /**
           * Additional information for accessibility.
           */
          contentDescription?: string;
          /**
           * State of the menu item
           */
          enabled: boolean;
          /**
           * Interface to show list of items on selection of menu item.
           */
          viewData: ViewData;
          /**
           * Whether the menu item is selected or not
           */
          selected: boolean;
      }
      /**
       * Represents information about view to show on Navigation Bar Menu item selection
       */
      interface ViewData {
          /**
           * Display header title of the item list.
           */
          listTitle?: string;
          /**
           * Type of the menu item.
           */
          listType: MenuListType;
          /**
           * Array of MenuItem. Icon value will be required for all items in the list.
           */
          listItems: MenuItem[];
      }
      /**
       * Represents information about type of list to display in Navigation Bar Menu.
       */
      enum MenuListType {
          dropDown = "dropDown",
          popOver = "popOver"
      }
      /**
       * Registers list of view configurations and it's handler.
       * Handler is responsible for listening selection of View Configuration.
       * @param viewConfig List of view configurations. Minimum 1 value is required.
       * @param handler The handler to invoke when the user selects view configuration.
       */
      function setUpViews(viewConfig: ViewConfiguration[], handler: (id: string) => boolean): void;
      /**
       * Used to set menu items on the Navigation Bar. If icon is available, icon will be shown, otherwise title will be shown.
       * @param items List of MenuItems for Navigation Bar Menu.
       * @param handler The handler to invoke when the user selects menu item.
       */
      function setNavBarMenu(items: MenuItem[], handler: (id: string) => boolean): void;
      interface ActionMenuParameters {
          /**
           * Display title for Action Menu
           */
          title: string;
          /**
           * List of MenuItems for Action Menu
           */
          items: MenuItem[];
      }
      /**
       * Used to show Action Menu.
       * @param params Parameters for Menu Parameters
       * @param handler The handler to invoke when the user selects menu item.
       */
      function showActionMenu(params: ActionMenuParameters, handler: (id: string) => boolean): void;
  }
  /**
   * @private
   * Hide from docs
   * ------
   * Allows an app to retrieve information of all user joined teams
   * @param callback The callback to invoke when the {@link TeamInstanceParameters} object is retrieved.
   * @param teamInstanceParameters OPTIONAL Flags that specify whether to scope call to favorite teams
   */
  export function getUserJoinedTeams(callback: (userJoinedTeamsInformation: UserJoinedTeamsInformation) => void, teamInstanceParameters?: TeamInstanceParameters): void;
  /**
   * @private
   * Hide from docs
   * ------
   * Place the tab into full-screen mode.
   */
  export function enterFullscreen(): void;
  /**
   * @private
   * Hide from docs
   * ------
   * Reverts the tab into normal-screen mode.
   */
  export function exitFullscreen(): void;
  /**
   * @private
   * Hide from docs.
   * ------
   * Opens a client-friendly preview of the specified file.
   * @param file The file to preview.
   */
  export function openFilePreview(filePreviewParameters: FilePreviewParameters): void;
  /**
   * @private
   * Hide from docs.
   * ------
   * display notification API.
   * @param message Notification message.
   * @param notificationType Notification type
   */
  export function showNotification(showNotificationParameters: ShowNotificationParameters): void;
  /**
   * @private
   * Hide from docs.
   * ------
   * Upload a custom App manifest directly to both team and personal scopes.
   * This method works just for the first party Apps.
   */
  export function uploadCustomApp(manifestBlob: Blob, onComplete?: (status: boolean, reason?: string) => void): void;
  /**
   * @private
   * Internal use only
   * Sends a custom action MessageRequest to Teams or parent window
   * @param actionName Specifies name of the custom action to be sent
   * @param args Specifies additional arguments passed to the action
   * @param callback Optionally specify a callback to receive response parameters from the parent
   * @returns id of sent message
   */
  export function sendCustomMessage(actionName: string, args?: any[], callback?: (...args: any[]) => void): number;
  /**
   * @private
   * Internal use only
   * Sends a custom action MessageEvent to a child iframe/window, only if you are not using auth popup.
   * Otherwise it will go to the auth popup (which becomes the child)
   * @param actionName Specifies name of the custom action to be sent
   * @param args Specifies additional arguments passed to the action
   * @returns id of sent message
   */
  export function sendCustomEvent(actionName: string, args?: any[]): void;
  /**
   * @private
   * Internal use only
   * Adds a handler for an action sent by a child window or parent window
   * @param actionName Specifies name of the action message to handle
   * @param customHandler The callback to invoke when the action message is received. The return value is sent to the child
   */
  export function registerCustomHandler(actionName: string, customHandler: (...args: any[]) => any[]): void;
  /**
   * @private
   * Hide from docs
   * ------
   * Allows an app to retrieve information of all chat members
   * Because a malicious party run your content in a browser, this value should
   * be used only as a hint as to who the members are and never as proof of membership.
   * @param callback The callback to invoke when the {@link ChatMembersInformation} object is retrieved.
   */
  export function getChatMembers(callback: (chatMembersInformation: ChatMembersInformation) => void): void;
  /**
   * @private
   * Hide from docs
   * ------
   * Allows an app to get the configuration setting value
   * @param callback The callback to invoke when the value is retrieved.
   * @param key The key for the config setting
   */
  export function getConfigSetting(callback: (value: string) => void, key: string): void;
  export namespace appInitialization {
      /**
       * To notify app loaded to hide loading indicator
       */
      function notifyAppLoaded(): void;
      /**
       * To notify app Initialization successs and ready for user interaction
       */
      function notifySuccess(): void;
      /**
       * To notify app Initialization failed
       */
      function notifyFailure(appInitializationFailedRequest: appInitialization.IFailedRequest): void;
      enum FailedReason {
          AuthFailed = "AuthFailed",
          Timeout = "Timeout",
          Other = "Other"
      }
      interface IFailedRequest {
          reason: appInitialization.FailedReason;
          message?: string;
      }
  }
  export interface IAppWindow {
      postMessage(message: any): void;
      addEventListener(type: string, listener: Function): void;
  }
  export class ChildAppWindow implements IAppWindow {
      postMessage(message: any, onComplete?: (status: boolean, reason?: string) => void): void;
      addEventListener(type: string, listener: (message: any) => void): void;
  }
  export class ParentAppWindow implements IAppWindow {
      private static _instance;
      static get Instance(): IAppWindow;
      postMessage(message: any, onComplete?: (status: boolean, reason?: string) => void): void;
      addEventListener(type: string, listener: (message: any) => void): void;
  }
  /**
   * Namespace to interact with the authentication-specific part of the SDK.
   * This object is used for starting or completing authentication flows.
   */
  export namespace authentication {
      /**
       * Registers the authentication GlobalVars.handlers
       * @param authenticateParameters A set of values that configure the authentication pop-up.
       */
      function registerAuthenticationHandlers(authenticateParameters: AuthenticateParameters): void;
      /**
       * Initiates an authentication request, which opens a new window with the specified settings.
       */
      function authenticate(authenticateParameters?: AuthenticateParameters): void;
      /**
       * Requests an Azure AD token to be issued on behalf of the app. The token is acquired from the cache
       * if it is not expired. Otherwise a request is sent to Azure AD to obtain a new token.
       * @param authTokenRequest A set of values that configure the token request.
       */
      function getAuthToken(authTokenRequest: AuthTokenRequest): void;
      /**
       * @private
       * Hide from docs.
       * ------
       * Requests the decoded Azure AD user identity on behalf of the app.
       */
      function getUser(userRequest: UserRequest): void;
      /**
       * Notifies the frame that initiated this authentication request that the request was successful.
       * This function is usable only on the authentication window.
       * This call causes the authentication window to be closed.
       * @param result Specifies a result for the authentication. If specified, the frame that initiated the authentication pop-up receives this value in its callback.
       * @param callbackUrl Specifies the url to redirect back to if the client is Win32 Outlook.
       */
      function notifySuccess(result?: string, callbackUrl?: string): void;
      /**
       * Notifies the frame that initiated this authentication request that the request failed.
       * This function is usable only on the authentication window.
       * This call causes the authentication window to be closed.
       * @param result Specifies a result for the authentication. If specified, the frame that initiated the authentication pop-up receives this value in its callback.
       * @param callbackUrl Specifies the url to redirect back to if the client is Win32 Outlook.
       */
      function notifyFailure(reason?: string, callbackUrl?: string): void;
      interface AuthenticateParameters {
          /**
           * The URL for the authentication pop-up.
           */
          url: string;
          /**
           * The preferred width for the pop-up. This value can be ignored if outside the acceptable bounds.
           */
          width?: number;
          /**
           * The preferred height for the pop-up. This value can be ignored if outside the acceptable bounds.
           */
          height?: number;
          /**
           * A function that is called if the authentication succeeds, with the result returned from the authentication pop-up.
           */
          successCallback?: (result?: string) => void;
          /**
           * A function that is called if the authentication fails, with the reason for the failure returned from the authentication pop-up.
           */
          failureCallback?: (reason?: string) => void;
      }
      interface AuthTokenRequest {
          /**
           * An optional list of resource for which to acquire the access token; only used for full trust apps.
           */
          resources?: string[];
          /**
           * An optional list of claims which to pass to AAD when requesting the access token.
           */
          claims?: string[];
          /**
           * An optional flag indicating whether to attempt the token acquisition silently or allow a prompt to be shown.
           */
          silent?: boolean;
          /**
           * A function that is called if the token request succeeds, with the resulting token.
           */
          successCallback?: (token: string) => void;
          /**
           * A function that is called if the token request fails, with the reason for the failure.
           */
          failureCallback?: (reason: string) => void;
      }
      /**
       * @private
       * Hide from docs.
       * ------
       */
      interface UserRequest {
          /**
           * A function that is called if the token request succeeds, with the resulting token.
           */
          successCallback?: (user: UserProfile) => void;
          /**
           * A function that is called if the token request fails, with the reason for the failure.
           */
          failureCallback?: (reason: string) => void;
      }
      /**
       * @private
       * Hide from docs.
       * ------
       */
      interface UserProfile {
          /**
           * The intended recipient of the token. The application that receives the token must verify that the audience
           * value is correct and reject any tokens intended for a different audience.
           */
          aud: string;
          /**
           * Identifies how the subject of the token was authenticated.
           */
          amr: string[];
          /**
           * Stores the time at which the token was issued. It is often used to measure token freshness.
           */
          iat: number;
          /**
           * Identifies the security token service (STS) that constructs and returns the token. In the tokens that Azure AD
           * returns, the issuer is sts.windows.net. The GUID in the issuer claim value is the tenant ID of the Azure AD
           * directory. The tenant ID is an immutable and reliable identifier of the directory.
           */
          iss: string;
          /**
           * Provides the last name, surname, or family name of the user as defined in the Azure AD user object.
           */
          family_name: string;
          /**
           * Provides the first or "given" name of the user, as set on the Azure AD user object.
           */
          given_name: string;
          /**
           * Provides a human-readable value that identifies the subject of the token. This value is not guaranteed to
           * be unique within a tenant and is designed to be used only for display purposes.
           */
          unique_name: string;
          /**
           * Contains a unique identifier of an object in Azure AD. This value is immutable and cannot be reassigned or
           * reused. Use the object ID to identify an object in queries to Azure AD.
           */
          oid: string;
          /**
           * Identifies the principal about which the token asserts information, such as the user of an application.
           * This value is immutable and cannot be reassigned or reused, so it can be used to perform authorization
           * checks safely. Because the subject is always present in the tokens the Azure AD issues, we recommended
           * using this value in a general-purpose authorization system.
           */
          sub: string;
          /**
           * An immutable, non-reusable identifier that identifies the directory tenant that issued the token. You can
           * use this value to access tenant-specific directory resources in a multitenant application. For example,
           * you can use this value to identify the tenant in a call to the Graph API.
           */
          tid: string;
          /**
           * Defines the time interval within which a token is valid. The service that validates the token should verify
           * that the current date is within the token lifetime; otherwise it should reject the token. The service might
           * allow for up to five minutes beyond the token lifetime to account for any differences in clock time ("time
           * skew") between Azure AD and the service.
           */
          exp: number;
          nbf: number;
          /**
           * Stores the user name of the user principal.
           */
          upn: string;
          /**
           * Stores the version number of the token.
           */
          ver: string;
      }
  }
  export enum HostClientType {
      desktop = "desktop",
      web = "web",
      android = "android",
      ios = "ios",
      rigel = "rigel"
  }
  export enum FrameContexts {
      settings = "settings",
      content = "content",
      authentication = "authentication",
      remove = "remove",
      task = "task",
      sidePanel = "sidePanel",
      stage = "stage"
  }
  /**
   * Indicates the team type, currently used to distinguish between different team
   * types in Office 365 for Education (team types 1, 2, 3, and 4).
   */
  export enum TeamType {
      Standard = 0,
      Edu = 1,
      Class = 2,
      Plc = 3,
      Staff = 4
  }
  /**
   * Indicates the various types of roles of a user in a team.
   */
  export enum UserTeamRole {
      Admin = 0,
      User = 1,
      Guest = 2
  }
  /**
   * Task module dimension enum
   */
  export enum TaskModuleDimension {
      Large = "large",
      Medium = "medium",
      Small = "small"
  }
  /**
   * The type of the channel with which the content is associated.
   */
  export enum ChannelType {
      Regular = "Regular",
      Private = "Private"
  }
  /**
   * Represents information about tabs for an app
   */
  export interface TabInformation {
      teamTabs: TabInstance[];
  }
  /**
   * Represents information about a tab instance
   */
  export interface TabInstance {
      /**
       * The name of the tab
       */
      tabName: string;
      /**
       * Internal: do not use
       * @protected
       */
      internalTabInstanceId?: string;
      /**
       * Last viewed time of this tab. null means unknown
       */
      lastViewUnixEpochTime?: string;
      /**
       * The developer-defined unique ID for the entity this content points to.
       */
      entityId?: string;
      /**
       * The Microsoft Teams ID for the channel with which the content is associated.
       */
      channelId?: string;
      /**
       * The name for the channel with which the content is associated.
       */
      channelName?: string;
      /**
       * Is this tab in a favorite channel?
       */
      channelIsFavorite?: boolean;
      /**
       * The Microsoft Teams ID for the team with which the content is associated.
       */
      teamId?: string;
      /**
       * The name for the team with which the content is associated.
       */
      teamName?: string;
      /**
       * Is this tab in a favorite team?
       */
      teamIsFavorite?: boolean;
      /**
       * The Office 365 group ID for the team with which the content is associated.
       * This field is available only when the identity permission is requested in the manifest.
       */
      groupId?: string;
      /**
       * Content URL of this tab
       */
      url?: string;
      /**
       * Website URL of this tab
       */
      websiteUrl?: string;
  }
  /**
   * Indicates information about the tab instance for filtering purposes.
   */
  export interface TabInstanceParameters {
      /**
       * Flag allowing to select favorite channels only
       */
      favoriteChannelsOnly?: boolean;
      /**
       * Flag allowing to select favorite teams only
       */
      favoriteTeamsOnly?: boolean;
  }
  /**
   * Represents Team Information
   */
  export interface TeamInformation {
      /**
       * Id of the team
       */
      teamId: string;
      /**
       * Team display name
       */
      teamName: string;
      /**
       * Team description
       */
      teamDescription?: string;
      /**
       * Thumbnail Uri
       */
      thumbnailUri?: string;
      /**
       * The Office 365 group ID for the team with which the content is associated.
       * This field is available only when the identity permission is requested in the manifest.
       */
      groupId?: string;
      /**
       * Role of current user in the team
       */
      userTeamRole?: UserTeamRole;
      /**
       * The type of the team.
       */
      teamType?: TeamType;
      /**
       * The locked status of the team
       */
      isTeamLocked?: boolean;
      /**
       * The archived status of the team
       */
      isTeamArchived?: boolean;
  }
  /**
   * Represents OS locale info used for formatting date and time data
   */
  export interface LocaleInfo {
      platform: 'windows' | 'macos';
      regionalFormat: string;
      shortDate: string;
      longDate: string;
      shortTime: string;
      longTime: string;
  }
  export interface Context {
      /**
       * The Office 365 group ID for the team with which the content is associated.
       * This field is available only when the identity permission is requested in the manifest.
       */
      groupId?: string;
      /**
       * The Microsoft Teams ID for the team with which the content is associated.
       */
      teamId?: string;
      /**
       * The name for the team with which the content is associated.
       */
      teamName?: string;
      /**
       * The Microsoft Teams ID for the channel with which the content is associated.
       */
      channelId?: string;
      /**
       * The name for the channel with which the content is associated.
       */
      channelName?: string;
      /**
       * The type of the channel with which the content is associated.
       */
      channelType?: ChannelType;
      /**
       * The developer-defined unique ID for the entity this content points to.
       */
      entityId: string;
      /**
       * The developer-defined unique ID for the sub-entity this content points to.
       * This field should be used to restore to a specific state within an entity,
       * such as scrolling to or activating a specific piece of content.
       */
      subEntityId?: string;
      /**
       * The current locale that the user has configured for the app formatted as
       * languageId-countryId (for example, en-us).
       */
      locale: string;
      /**
       * More detailed locale info from the user's OS if available. Can be used together with
       * the @microsoft/globe NPM package to ensure your app respects the user's OS date and
       * time format configuration
       */
      osLocaleInfo?: LocaleInfo;
      /**
       * @deprecated Use loginHint or userPrincipalName.
       * The UPN of the current user.
       * Because a malicious party can run your content in a browser, this value should
       * be used only as a hint as to who the user is and never as proof of identity.
       * This field is available only when the identity permission is requested in the manifest.
       */
      upn?: string;
      /**
       * The Azure AD tenant ID of the current user.
       * Because a malicious party can run your content in a browser, this value should
       * be used only as a hint as to who the user is and never as proof of identity.
       * This field is available only when the identity permission is requested in the manifest.
       */
      tid?: string;
      /**
       * The current UI theme.
       */
      theme?: string;
      /**
       * Indication whether the tab is in full-screen mode.
       */
      isFullScreen?: boolean;
      /**
       * The type of the team.
       */
      teamType?: TeamType;
      /**
       * The root SharePoint site associated with the team.
       */
      teamSiteUrl?: string;
      /**
       * The domain of the root SharePoint site associated with the team.
       */
      teamSiteDomain?: string;
      /**
       * The relative path to the SharePoint site associated with the team.
       */
      teamSitePath?: string;
      /**
       * The relative path to the SharePoint folder associated with the channel.
       */
      channelRelativeUrl?: string;
      /**
       * Unique ID for the current Teams session for use in correlating telemetry data.
       */
      sessionId?: string;
      /**
       * The user's role in the team.
       * Because a malicious party can run your content in a browser, this value should
       * be used only as a hint as to the user's role, and never as proof of her role.
       */
      userTeamRole?: UserTeamRole;
      /**
       * The Microsoft Teams ID for the chat with which the content is associated.
       */
      chatId?: string;
      /**
       * A value suitable for use as a login_hint when authenticating with Azure AD.
       * Because a malicious party can run your content in a browser, this value should
       * be used only as a hint as to who the user is and never as proof of identity.
       * This field is available only when the identity permission is requested in the manifest.
       */
      loginHint?: string;
      /**
       * The UPN of the current user. This may be an externally-authenticated UPN (e.g., guest users).
       * Because a malicious party run your content in a browser, this value should
       * be used only as a hint as to who the user is and never as proof of identity.
       * This field is available only when the identity permission is requested in the manifest.
       */
      userPrincipalName?: string;
      /**
       * The Azure AD object id of the current user.
       * Because a malicious party run your content in a browser, this value should
       * be used only as a hint as to who the user is and never as proof of identity.
       * This field is available only when the identity permission is requested in the manifest.
       */
      userObjectId?: string;
      /**
       * Indicates whether team is archived.
       * Apps should use this as a signal to prevent any changes to content associated with archived teams.
       */
      isTeamArchived?: boolean;
      /**
       * The type of the host client. Possible values are : android, ios, web, desktop, rigel
       */
      hostClientType?: HostClientType;
      /**
       * The context where tab url is loaded (content, task, setting, remove, sidePanel)
       */
      frameContext?: FrameContexts;
      /**
       * SharePoint context. This is only available when hosted in SharePoint.
       */
      sharepoint?: any;
      /**
       * The type of license for the current users tenant.
       */
      tenantSKU?: string;
      /**
       * The license type for the current user.
       */
      userLicenseType?: string;
      /**
       * The ID of the parent message from which this task module was launched.
       * This is only available in task modules launched from bot cards.
       */
      parentMessageId?: string;
      /**
       * Current ring ID
       */
      ringId?: string;
      /**
       * Unique ID for the current session for use in correlating telemetry data.
       */
      appSessionId?: string;
      /**
       * Represents whether calling is allowed for the current logged in User
       */
      isCallingAllowed?: boolean;
      /**
       * Represents whether PSTN calling is allowed for the current logged in User
       */
      isPSTNCallingAllowed?: boolean;
      /**
       * Meeting Id used by tab when running in meeting context
       */
      meetingId?: string;
      /**
       * The OneNote section ID that is linked to the channel.
       */
      defaultOneNoteSectionId?: string;
      /**
       * Indication whether the tab is in a pop out window
       */
      isMultiWindow?: boolean;
      /**
       * Personal app icon y coordinate position
       */
      appIconPosition?: number;
  }
  export interface DeepLinkParameters {
      /**
       * The developer-defined unique ID for the sub-entity to which this deep link points in the current entity.
       * This field should be used to restore to a specific state within an entity, such as scrolling to or activating a specific piece of content.
       */
      subEntityId: string;
      /**
       * The label for the sub-entity that should be displayed when the deep link is rendered in a client.
       */
      subEntityLabel: string;
      /**
       * The fallback URL to which to navigate the user if the client cannot render the page.
       * This URL should lead directly to the sub-entity.
       */
      subEntityWebUrl?: string;
  }
  export interface TaskInfo {
      /**
       * The url to be rendered in the webview/iframe.
       */
      url?: string;
      /**
       * JSON defining an adaptive card.
       */
      card?: string;
      /**
       * The requested height of the webview/iframe.
       */
      height?: TaskModuleDimension | number;
      /**
       * The requested width of the webview/iframe.
       */
      width?: TaskModuleDimension | number;
      /**
       * Title of the task module.
       */
      title?: string;
      /**
       * If client doesnt support the URL, the URL that needs to be opened in the browser.
       */
      fallbackUrl?: string;
      /**
       * Specifies a bot ID to send the result of the user's interaction with the task module.
       * If specified, the bot will receive a task/complete invoke event with a JSON object
       * in the event payload.
       */
      completionBotId?: string;
  }
  /**
   * @private
   * Hide from docs.
   * ------
   */
  export interface OpenConversationRequest {
      /**
       * The Id of the subEntity where the conversation is taking place
       */
      subEntityId: string;
      /**
       * The title of the conversation
       */
      title: string;
      /**
       * The Id of the conversation. This is optional and should be specified whenever a previous conversation about a specific sub-entity has already been started before
       */
      conversationId?: string;
      /**
       * The Id of the channel. This is optional and should be specified whenever a conversation is started or opened in a personal app scope
       */
      channelId?: string;
      /**
       * The entity Id of the tab
       */
      entityId: string;
      /**
       * A function that is called once the conversation Id has been created
       */
      onStartConversation?: (conversationResponse: ConversationResponse) => void;
      /**
       * A function that is called if the pane is closed
       */
      onCloseConversation?: (conversationResponse: ConversationResponse) => void;
  }
  /**
   * @private
   * Hide from docs.
   * ------
   */
  export interface ConversationResponse {
      /**
       * The Id of the subEntity where the conversation is taking place
       */
      subEntityId: string;
      /**
       * The Id of the conversation. This is optional and should be specified whenever a previous conversation about a specific sub-entity has already been started before
       */
      conversationId?: string;
      /**
       * The Id of the channel. This is optional and should be specified whenever a conversation is started or opened in a personal app scope
       */
      channelId?: string;
      /**
       * The entity Id of the tab
       */
      entityId?: string;
  }
  /**
   * @private
   * Hide from docs.
   */
  export interface LoadContext {
      /**
       * The enitity that is requested to be loaded
       */
      entityId: string;
      /**
       * The content URL that is requested to be loaded
       */
      contentUrl: string;
  }
  export interface FrameContext {
      /**
       * The current URL that needs to be used in the iframe if the tab is reloaded
       */
      contentUrl: string;
      /**
       * The current URL that needs to be used for opening the website when the user clicks on 'Go to website'
       */
      websiteUrl: string;
  }
  export interface SdkError {
      /**
      error code
      */
      errorCode: ErrorCode;
      /**
      Optional description for the error. This may contain useful information for web-app developers.
      This string will not be localized and is not for end-user consumption.
      App should not depend on the string content. The exact value may change. This is only for debugging purposes.
      */
      message?: string;
  }
  export enum ErrorCode {
      /**
       * API not supported in the current platform.
       */
      NOT_SUPPORTED_ON_PLATFORM = 100,
      /**
       * Internal error encountered while performing the required operation.
       */
      INTERNAL_ERROR = 500,
      /**
      Permissions denied by user
      */
      PERMISSION_DENIED = 1000,
      /**
       * Network issue
       */
      NETWORK_ERROR = 2000,
      /**
       * Underlying hardware doesn't support the capability
       */
      NO_HW_SUPPORT = 3000,
      /**
       * One or more arguments are invalid
       */
      INVALID_ARGUMENTS = 4000,
      /**
       * User is not authorized for this operation
       */
      UNAUTHORIZED_USER_OPERATION = 5000,
      /**
       * Could not complete the operation due to insufficient resources
       */
      INSUFFICIENT_RESOURCES = 6000,
      /**
       * Platform throttled the request because of API was invoked too frequently
       */
      THROTTLE = 7000,
      /**
       * User aborted the operation
       */
      USER_ABORT = 8000,
      /**
       * Platform code is old and doesn't implement this API
       */
      OLD_PLATFORM = 9000,
      /**
       * The file specified was not found on the given location
       */
      FILE_NOT_FOUND = 404,
      /**
       * The return value is too big and has exceeded our size boundries
       */
      SIZE_EXCEEDED = 10000
  }
  export namespace location {
      /**
       * This is the SDK version when location APIs (getLocation and showLocation) are supported.
       */
      const locationAPIsRequiredVersion = "1.9.0";
      interface LocationProps {
          /**
          whether user can alter location or not
          if false, user will be shown current location
          and wouldn't be allowed to alter it
          */
          allowChooseLocation: boolean;
          /**
          whether selected location should be shown to user on map or not.
          If allowChooseLocation is true, this parameter will be ignored by platform.
          If allowChooseLocation is false, and this paramater is not provided, default
          value will be false.
          */
          showMap?: boolean;
      }
      interface Location {
          /**
          Latitude of the location
          */
          latitude: number;
          /**
          Longitude of the location
          */
          longitude: number;
          /**
          Accuracy of the coordinates captured
          */
          accuracy?: number;
          /**
          Time stamp when the location was captured
          */
          timestamp?: number;
      }
      /**
       * Fetches current user coordinates or allows user to choose location on map
       * @param callback Callback to invoke when current user location is fetched
       */
      function getLocation(props: LocationProps, callback: (error: SdkError, location: Location) => void): void;
      /**
       * Shows the location on map corresponding to the given coordinates
       * @param location {@link Location} which needs to be shown on map
       * @param callback Callback to invoke when the location is opened on map
       */
      function showLocation(location: Location, callback: (error: SdkError, status: boolean) => void): void;
  }
  export namespace media {
      /**
       * Enum for file formats supported
       */
      enum FileFormat {
          Base64 = "base64",
          ID = "id"
      }
      /**
       * File object that can be used to represent image or video or audio
       */
      class File {
          /**
           * Content of the file. When format is Base64, this is the base64 content
           * When format is ID, this is id mapping to the URI
           * When format is base64 and app needs to use this directly in HTML tags, it should convert this to dataUrl.
           */
          content: string;
          /**
           * Format of the content
           */
          format: FileFormat;
          /**
           * Size of the file in KB
           */
          size: number;
          /**
           * MIME type. This can be used for constructing a dataUrl, if needed.
           */
          mimeType: string;
          /**
           * Optional: Name of the file
           */
          name?: string;
      }
      /**
       * Launch camera, capture image or choose image from gallery and return the images as a File[] object to the callback.
       * Callback will be called with an error, if there are any. App should first check the error.
       * If it is present the user can be updated with appropriate error message.
       * If error is null or undefined, then files will have the required result.
       * Note: Currently we support getting one File through this API, i.e. the file arrays size will be one.
       * Note: For desktop, this API is not supported. Callback will be resolved with ErrorCode.NotSupported.
       * @see File
       * @see SdkError
       */
      function captureImage(callback: (error: SdkError, files: File[]) => void): void;
      /**
       * Media object returned by the select Media API
       */
      class Media extends File {
          constructor(that?: Media);
          /**
           * A preview of the file which is a lightweight representation.
           * In case of images this will be a thumbnail/compressed image in base64 encoding.
           */
          preview: string;
          /**
           * Gets the media in chunks irrespecitve of size, these chunks are assembled and sent back to the webapp as file/blob
           * @param callback returns blob of media
           */
          getMedia(callback: (error: SdkError, blob: Blob) => void): void;
      }
      /**
       * Input parameter supplied to the select Media API
       */
      interface MediaInputs {
          /**
           * Only one media type can be selected at a time
           */
          mediaType: MediaType;
          /**
           * max limit of media allowed to be selected in one go, current max limit is 10 set by office lens.
           */
          maxMediaCount: number;
          /**
           * Additional properties for customization of select media in mobile devices
           */
          imageProps?: ImageProps;
          /**
           * Additional properties for audio capture flows.
           */
          audioProps?: AudioProps;
      }
      /**
       *  All properties in ImageProps are optional and have default values in the platform
       */
      interface ImageProps {
          /**
           * Optional; Lets the developer specify the image source, more than one can be specified.
           * Default value is both camera and gallery
           */
          sources?: Source[];
          /**
           * Optional; Specify in which mode the camera will be opened.
           * Default value is Photo
           */
          startMode?: CameraStartMode;
          /**
           * Optional; indicate if inking on the selected Image is allowed or not
           * Default value is true
           */
          ink?: boolean;
          /**
           * Optional; indicate if user is allowed to move between front and back camera
           * Default value is true
           */
          cameraSwitcher?: boolean;
          /**
           * Optional; indicate if putting text stickers on the selected Image is allowed or not
           * Default value is true
           */
          textSticker?: boolean;
          /**
           * Optional; indicate if image filtering mode is enabled on the selected image
           * Default value is false
           */
          enableFilter?: boolean;
      }
      /**
       *  All properties in AudioProps are optional and have default values in the platform
       */
      interface AudioProps {
          /**
           * Optional; the maximum duration in minutes after which the recording should terminate automatically.
           * Default value is defined by the platform serving the API.
           */
          maxDuration?: number;
      }
      /**
       * The modes in which camera can be launched in select Media API
       */
      enum CameraStartMode {
          Photo = 1,
          Document = 2,
          Whiteboard = 3,
          BusinessCard = 4
      }
      /**
       * Specifies the image source
       */
      enum Source {
          Camera = 1,
          Gallery = 2
      }
      /**
       * Specifies the type of Media
       */
      enum MediaType {
          Image = 1,
          Audio = 4
      }
      /**
       * Input for view images API
       */
      interface ImageUri {
          value: string;
          type: ImageUriType;
      }
      /**
       * ID contains a mapping for content uri on platform's side, URL is generic
       */
      enum ImageUriType {
          ID = 1,
          URL = 2
      }
      /**
       * Media chunks an output of getMedia API from platform
       */
      interface MediaChunk {
          /**
           * Base 64 data for the requested uri
           */
          chunk: string;
          /**
           * chunk sequence number​
           */
          chunkSequence: number;
      }
      /**
       * Helper object to assembled media chunks
       */
      interface AssembleAttachment {
          sequence: number;
          file: Blob;
      }
      /**
       * Select an attachment using camera/gallery
       * @param mediaInputs The input params to customize the media to be selected
       * @param callback The callback to invoke after fetching the media
       */
      function selectMedia(mediaInputs: MediaInputs, callback: (error: SdkError, attachments: Media[]) => void): void;
      /**
       * View images using native image viewer
       * @param uriList urilist of images to be viewed - can be content uri or server url. supports upto 10 Images in one go
       * @param callback returns back error if encountered, returns null in case of success
       */
      function viewImages(uriList: ImageUri[], callback: (error?: SdkError) => void): void;
  }
  /**
   * Navigation specific part of the SDK.
   */
  /**
   * Return focus to the main Teams app. Will focus search bar if navigating foward and app bar if navigating back.
   * @param navigateForward Determines the direction to focus in teams app.
   */
  export function returnFocus(navigateForward?: boolean): void;
  /**
   * Navigates the Microsoft Teams app to the specified tab instance.
   * @param tabInstance The tab instance to navigate to.
   */
  export function navigateToTab(tabInstance: TabInstance, onComplete?: (status: boolean, reason?: string) => void): void;
  /**
   * Navigates the frame to a new cross-domain URL. The domain of this URL must match at least one of the
   * valid domains specified in the validDomains block of the manifest; otherwise, an exception will be
   * thrown. This function needs to be used only when navigating the frame to a URL in a different domain
   * than the current one in a way that keeps the app informed of the change and allows the SDK to
   * continue working.
   * @param url The URL to navigate the frame to.
   */
  export function navigateCrossDomain(url: string, onComplete?: (status: boolean, reason?: string) => void): void;
  /**
   * Navigates back in the Teams client. See registerBackButtonHandler for more information on when
   * it's appropriate to use this method.
   */
  export function navigateBack(onComplete?: (status: boolean, reason?: string) => void): void;
  /**
   * Initializes the library. This must be called before any other SDK calls
   * but after the frame is loaded successfully.
   * @param callback Optionally specify a callback to invoke when Teams SDK has successfully initialized
   * @param validMessageOrigins Optionally specify a list of cross frame message origins. There must have
   * https: protocol otherwise they will be ignored. Example: https://www.example.com
   */
  export function initialize(callback?: () => void, validMessageOrigins?: string[]): void;
  /**
   * @private
   * Hide from docs.
   * ------
   * Undocumented function used to set a mock window for unit tests
   */
  export function _initialize(hostWindow: any): void;
  /**
   * @private
   * Hide from docs.
   * ------
   * Undocumented function used to clear state between unit tests
   */
  export function _uninitialize(): void;
  /**
   * Enable print capability to support printing page using Ctrl+P and cmd+P
   */
  export function enablePrintCapability(): void;
  /**
   * default print handler
   */
  export function print(): void;
  /**
   * Retrieves the current context the frame is running in.
   * @param callback The callback to invoke when the {@link Context} object is retrieved.
   */
  export function getContext(callback: (context: Context) => void): void;
  /**
   * Registers a handler for theme changes.
   * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
   * @param handler The handler to invoke when the user changes their theme.
   */
  export function registerOnThemeChangeHandler(handler: (theme: string) => void): void;
  /**
   * Registers a handler for changes from or to full-screen view for a tab.
   * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
   * @param handler The handler to invoke when the user toggles full-screen view for a tab.
   */
  export function registerFullScreenHandler(handler: (isFullScreen: boolean) => void): void;
  /**
   * Registers a handler for clicking the app button.
   * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
   * @param handler The handler to invoke when the personal app button is clicked in the app bar.
   */
  export function registerAppButtonClickHandler(handler: () => void): void;
  /**
   * Registers a handler for entering hover of the app button.
   * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
   * @param handler The handler to invoke when entering hover of the personal app button in the app bar.
   */
  export function registerAppButtonHoverEnterHandler(handler: () => void): void;
  /**
   * Registers a handler for exiting hover of the app button.
   * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
   * @param handler The handler to invoke when exiting hover of the personal app button in the app bar.
   */
  export function registerAppButtonHoverLeaveHandler(handler: () => void): void;
  /**
   * Registers a handler for user presses of the Team client's back button. Experiences that maintain an internal
   * navigation stack should use this handler to navigate the user back within their frame. If an app finds
   * that after running its back button handler it cannot handle the event it should call the navigateBack
   * method to ask the Teams client to handle it instead.
   * @param handler The handler to invoke when the user presses their Team client's back button.
   */
  export function registerBackButtonHandler(handler: () => boolean): void;
  /**
   * @private
   * Registers a handler to be called when the page has been requested to load.
   * @param handler The handler to invoke when the page is loaded.
   */
  export function registerOnLoadHandler(handler: (context: LoadContext) => void): void;
  /**
   * @private
   * Registers a handler to be called before the page is unloaded.
   * @param handler The handler to invoke before the page is unloaded. If this handler returns true the page should
   * invoke the readyToUnload function provided to it once it's ready to be unloaded.
   */
  export function registerBeforeUnloadHandler(handler: (readyToUnload: () => void) => boolean): void;
  /**
   * Registers a handler for when the user reconfigurated tab
   * @param handler The handler to invoke when the user click on Settings.
   */
  export function registerChangeSettingsHandler(handler: () => void): void;
  /**
   * Allows an app to retrieve for this user tabs that are owned by this app.
   * If no TabInstanceParameters are passed, the app defaults to favorite teams and favorite channels.
   * @param callback The callback to invoke when the {@link TabInstanceParameters} object is retrieved.
   * @param tabInstanceParameters OPTIONAL Flags that specify whether to scope call to favorite teams or channels.
   */
  export function getTabInstances(callback: (tabInfo: TabInformation) => void, tabInstanceParameters?: TabInstanceParameters): void;
  /**
   * Allows an app to retrieve the most recently used tabs for this user.
   * @param callback The callback to invoke when the {@link TabInformation} object is retrieved.
   * @param tabInstanceParameters OPTIONAL Ignored, kept for future use
   */
  export function getMruTabInstances(callback: (tabInfo: TabInformation) => void, tabInstanceParameters?: TabInstanceParameters): void;
  /**
   * Shares a deep link that a user can use to navigate back to a specific state in this page.
   * @param deepLinkParameters ID and label for the link and fallback URL.
   */
  export function shareDeepLink(deepLinkParameters: DeepLinkParameters): void;
  /**
   * execute deep link API.
   * @param deepLink deep link.
   */
  export function executeDeepLink(deepLink: string, onComplete?: (status: boolean, reason?: string) => void): void;
  export function setFrameContext(frameContext: FrameContext): void;
  export function initializeWithFrameContext(frameContext: FrameContext, callback?: () => void, validMessageOrigins?: string[]): void;
  /**
   * Namespace to interact with the settings-specific part of the SDK.
   * This object is usable only on the settings frame.
   */
  export namespace settings {
      /**
       * Sets the validity state for the settings.
       * The initial value is false, so the user cannot save the settings until this is called with true.
       * @param validityState Indicates whether the save or remove button is enabled for the user.
       */
      function setValidityState(validityState: boolean): void;
      /**
       * Gets the settings for the current instance.
       * @param callback The callback to invoke when the {@link Settings} object is retrieved.
       */
      function getSettings(callback: (instanceSettings: Settings) => void): void;
      /**
       * Sets the settings for the current instance.
       * This is an asynchronous operation; calls to getSettings are not guaranteed to reflect the changed state.
       * @param settings The desired settings for this instance.
       */
      function setSettings(instanceSettings: Settings, onComplete?: (status: boolean, reason?: string) => void): void;
      /**
       * Registers a handler for when the user attempts to save the settings. This handler should be used
       * to create or update the underlying resource powering the content.
       * The object passed to the handler must be used to notify whether to proceed with the save.
       * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
       * @param handler The handler to invoke when the user selects the save button.
       */
      function registerOnSaveHandler(handler: (evt: SaveEvent) => void): void;
      /**
       * Registers a handler for user attempts to remove content. This handler should be used
       * to remove the underlying resource powering the content.
       * The object passed to the handler must be used to indicate whether to proceed with the removal.
       * Only one handler may be registered at a time. Subsequent registrations will override the first.
       * @param handler The handler to invoke when the user selects the remove button.
       */
      function registerOnRemoveHandler(handler: (evt: RemoveEvent) => void): void;
      interface Settings {
          /**
           * A suggested display name for the new content.
           * In the settings for an existing instance being updated, this call has no effect.
           */
          suggestedDisplayName?: string;
          /**
           * Sets the URL to use for the content of this instance.
           */
          contentUrl: string;
          /**
           * Sets the URL for the removal configuration experience.
           */
          removeUrl?: string;
          /**
           * Sets the URL to use for the external link to view the underlying resource in a browser.
           */
          websiteUrl?: string;
          /**
           * The developer-defined unique ID for the entity to which this content points.
           */
          entityId: string;
      }
      interface SaveEvent {
          /**
           * Object containing properties passed as arguments to the settings.save event.
           */
          result: SaveParameters;
          /**
           * Indicates that the underlying resource has been created and the settings can be saved.
           */
          notifySuccess(): void;
          /**
           * Indicates that creation of the underlying resource failed and that the settings cannot be saved.
           * @param reason Specifies a reason for the failure. If provided, this string is displayed to the user; otherwise a generic error is displayed.
           */
          notifyFailure(reason?: string): void;
      }
      interface RemoveEvent {
          /**
           * Indicates that the underlying resource has been removed and the content can be removed.
           */
          notifySuccess(): void;
          /**
           * Indicates that removal of the underlying resource failed and that the content cannot be removed.
           * @param reason Specifies a reason for the failure. If provided, this string is displayed to the user; otherwise a generic error is displayed.
           */
          notifyFailure(reason?: string): void;
      }
      interface SaveParameters {
          /**
           * Connector's webhook Url returned as arguments to settings.save event as part of user clicking on Save
           */
          webhookUrl?: string;
      }
  }
  /**
   * Namespace to interact with the task module-specific part of the SDK.
   * This object is usable only on the content frame.
   */
  export namespace tasks {
      /**
       * Allows an app to open the task module.
       * @param taskInfo An object containing the parameters of the task module
       * @param submitHandler Handler to call when the task module is completed
       */
      function startTask(taskInfo: TaskInfo, submitHandler?: (err: string, result: string) => void): IAppWindow;
      /**
       * Update height/width task info properties.
       * @param taskInfo An object containing width and height properties
       */
      function updateTask(taskInfo: TaskInfo): void;
      /**
       * Submit the task module.
       * @param result Contains the result to be sent to the bot or the app. Typically a JSON object or a serialized version of it
       * @param appIds Helps to validate that the call originates from the same appId as the one that invoked the task module
       */
      function submitTask(result?: string | object, appIds?: string | string[]): void;
  }
}