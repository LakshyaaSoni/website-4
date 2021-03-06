defmodule MCSN.Runs.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    # List all child processes to be supervised
    children = [
      # Start Commanded's event store
      MCSN.Runs.App,
      # EventHandlers,
      MCSN.Runs.Handlers.RunsProjector,
      # Start the Ecto repository
      MCSN.Runs.Repo,
      # Start the endpoint when the application starts
      MCSN.RunsWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: MCSN.Runs.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    MCSN.RunsWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
