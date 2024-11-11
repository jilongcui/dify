from typing import Any

from core.tools.errors import ToolProviderCredentialValidationError
from core.tools.provider.builtin.pubmed.tools.pubmed_search import PubMedSearchTool
from core.tools.provider.builtin_tool_provider import BuiltinToolProviderController


class PubMedProvider(BuiltinToolProviderController):
    def _validate_credentials(self, credentials: dict[str, Any]) -> None:
        try:
            PubMedSearchTool().fork_tool_runtime(
                runtime={
                    "credentials": credentials,
                }
            ).validate_credentials(
                credentials=credentials,
                parameters={
                    "query": "John Doe",
                },
            )
            # .invoke(
            #     user_id="",
            #     tool_parameters={
            #         "query": "John Doe",
            #     },
            # )
        except Exception as e:
            raise ToolProviderCredentialValidationError(str(e))
