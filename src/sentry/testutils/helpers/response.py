from __future__ import annotations

from collections.abc import Iterable

from django.http.response import StreamingHttpResponse


def close_streaming_response(response: StreamingHttpResponse) -> bytes:
    """Exhausts the streamed file in a response.

    When the file is exahusted, this underlying file descriptor is closed
    avoiding a `ResourceWarning`.
    """
    assert isinstance(response.streaming_content, Iterable)
    return b"".join(response.streaming_content)
