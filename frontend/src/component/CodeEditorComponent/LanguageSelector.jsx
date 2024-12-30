import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React  from 'react'
import { LANGUAGE_VERSIONS } from './Constants'

const languages = Object.entries(LANGUAGE_VERSIONS)
const ACTIVE_COLOR = "blue.400";

function LanguageSelector({ language, onSelect }) {
    return (
      <Box ml={2} mb={4}>
        <Text mb={2} fontSize="lg" fontWeight="bold">
          Language:
        </Text>
        <Menu isLazy>
          <MenuButton as={Button} p={4} className="border-white rounded bg-gray-800 text-white hover:bg-gray-700">
            {language}
          </MenuButton>
          <MenuList
            bg="#110c1b"
            border="1px solid #2d2d2d"
            borderRadius="md"
            shadow="lg"
            zIndex={1500}
          >
            {languages.map(([lang, version]) => (
              <MenuItem
                key={lang}
                color={lang === language ? ACTIVE_COLOR : ""}
                bg={lang === language ? "gray.900" : "transparent"}
                _hover={{
                  color: ACTIVE_COLOR,
                  bg: "gray.900",
                }}
                onClick={() => onSelect(lang)}
              >
                {lang}
                &nbsp;
                <Text as="span" color="gray.600" fontSize="sm">
                  ({version})
                </Text>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
    );
  }
  
  export default LanguageSelector;
  