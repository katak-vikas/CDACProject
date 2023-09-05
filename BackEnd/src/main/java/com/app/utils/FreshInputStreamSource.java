package com.app.utils;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.core.io.InputStreamSource;

public class FreshInputStreamSource implements InputStreamSource {
    private final byte[] data;

    public FreshInputStreamSource(byte[] data) {
        this.data = data;
    }

    @Override
    public InputStream getInputStream() throws IOException {
        return new ByteArrayInputStream(data);
    }
}