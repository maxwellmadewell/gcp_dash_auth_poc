from dash import Dash, dcc, html, Input, Output, State, ctx
import dash
from dash.exceptions import PreventUpdate
import dash_bootstrap_components as dbc
from dash.dependencies import ClientsideFunction
import json
from firebase_admin import credentials
from components.profile import profile_icon, popover_profile
from flask import Flask
from flask_login import login_user, LoginManager, UserMixin, current_user

# Initialize Firebase app
cred = credentials.Certificate("C:\\Users\\mxmco\\.config\\gcloud\\authmapdemo-firebase-adminsdk-y0qfs-e6f7182a58.json")
# firebase_admin.initialize_app(cred)
EXTERNAL_STYLESHEETS = [
    "https://www.gstatic.com/firebasejs/ui/6.0.2/firebase-ui-auth.css",
    {
        'href': 'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
        'rel': 'stylesheet',
        'integrity': 'sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf',
        'crossorigin': 'anonymous'
    },
    dbc.themes.BOOTSTRAP,
    dbc.icons.BOOTSTRAP,
    'https://scopelab.ai/files/lightstyle.css',
    'http://cdn.datatables.net/1.10.2/css/jquery.dataTables.min.css',
]
EXTERNAL_SCRIPTS = [
    {'src': 'https://cdn.firebase.com/js/client/2.2.1/firebase.js'},
    {'src': 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'},
    {"src": "https://www.gstatic.com/firebasejs/ui/6.0.2/firebase-ui-auth.js"},
    {"src": "https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js"},
    {"src": "https://www.gstatic.com/firebasejs/7.8.0/firebase-auth.js"},
    {"src": "https://www.gstatic.com/firebasejs/9.13.0/firebase-app-compat.js"},
    {"src": "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth-compat.js"},]

server = Flask(__name__)
app = Dash(__name__, server=server, external_stylesheets=EXTERNAL_STYLESHEETS, external_scripts=EXTERNAL_SCRIPTS,
           suppress_callback_exceptions=True, use_pages=True)

# Login manager object will be used to login / logout users
login_manager = LoginManager()
login_manager.init_app(server)
login_manager.login_view = "/login"

class User(UserMixin):
    # User data model. It has to have at least self.id as a minimum
    def __init__(self, username):
        self.id = username


app.layout = html.Div(
    [
        dcc.Location(id="url"),
        dcc.Store(id="userInfoStorage", storage_type="local"),
        dcc.Store(id="userCredentialStorage", storage_type="local"),
        dcc.Store(id="logInStatusStorage", storage_type="session"),
        dcc.Store(id="logOutStatusStorage", storage_type="session"),
        html.Hr(),
        profile_icon,
        popover_profile,
        dbc.Input(type='text', id='user-bridge-node', style={'display': "None"}),
        html.Hr(),
        html.Div(id="firebaseui-auth-container"),
        dbc.Button("Sign In", id="login", color="danger"),
        html.Hr(),
        dash.page_container,
    ]
)


@app.callback(
    Output("userStorage", "data"),
    Input("user-bridge-node", "value"),
    State("userInfoStorage", "data"),
    prevent_initial_call=True
)
def update_user_storage(value, data):
    # print(f"[BridgeNodeChange <-> UserStorage Updated\n"
    #       f"\tValueBN: {value}\n"
    #       f"\tdata: {data}")
    return data


app.clientside_callback(
    ClientsideFunction(
        namespace='clientside',
        function_name='log_user_in'
    ),
    Output('logInStatusStorage', 'data'),
    Input('login', 'n_clicks'),
    Input('btn-popover-profile-log-in', 'n_clicks'),
    prevent_initial_call=True
)

app.clientside_callback(
    ClientsideFunction(
        namespace='clientside',
        function_name='log_user_out'
    ),
    Output('logOutStatusStorage', 'data'),
    Input('btn-popover-profile-log-out', 'n_clicks'),
    prevent_initial_call=True
)

@app.callback(
    Output("btn-popover-profile-log-in", "style"),
    Output("btn-popover-profile-log-out", "style"),
    Input("user-bridge-node", "value"),
)
def profile_buttons_display(value):
    try:
        user_info = json.loads(value)
        user_name = user_info['displayName']
        if not user_name or user_name == "":
            return {"width": "100%"}, {"display": "None"}
        else:
            return {"display": "None"}, {"width": "100%"}
    except Exception:
        raise PreventUpdate

@app.callback(
    Output("popover-profile-photo", "src"),
    Output("popover-profile-name", "children"),
    Output("popover-profile-email", "children"),
    Input("user-bridge-node", "value"),
    State("userInfoStorage", "data"),
    prevent_initial_call=True
)
def update_profile(value, data):

    user_info = json.loads(value)
    # TODO - storage is not updated by the time this callback occurs
    print(user_info)
    return user_info["photoURL"], user_info["displayName"], user_info["email"]


if __name__ == '__main__':
    app.run_server(debug=True)