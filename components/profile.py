import dash_bootstrap_components as dbc
from dash import html

user_icon = html.I(className='fas fa-user fa-lg', id="user-icon")
profile_icon = dbc.Button(user_icon, id='user-icon-button')
popover_profile = html.Div(
    [
        dbc.Popover(
            [
                dbc.PopoverBody(
                    [
                        dbc.Row([
                            dbc.Col([
                                html.Img(src='https://via.placeholder.com/100', width='100px',
                                         id="popover-profile-photo", style={"margin": "0 auto", "display": "block",
                                                                            "border-radius": "50%"}),
                            ], width=4),
                            dbc.Col([
                                html.H4("First LastPlaceHolder", className='mb-0',
                                        id="popover-profile-name", style={"text-align": "left", "min-width": "10vw"}),
                                html.P("placeholder@gmail.com", className='mb-0',
                                       id="popover-profile-email", style={"text-align": "left", "min-width": "10vw"})
                            ], width=8),
                        ]),
                        dbc.Row([
                            dbc.Col([], width=4),
                            dbc.Col([
                                dbc.Button("Sign Out", id="btn-popover-profile-log-out", color="danger",
                                           style={"display": "None", "width": "100%"}),
                                dbc.Button("Sign In", id="btn-popover-profile-log-in", color="danger",
                                           style={"width": "100%"})
                            ], width=8),
                        ])
                    ], id="popover-profile-body"),
            ],
            style={"min-width": "15vw", "max-width": "none"},
            id='user-profile-popover',
            target="user-icon-button",
            trigger="click"
        ),
    ]
)